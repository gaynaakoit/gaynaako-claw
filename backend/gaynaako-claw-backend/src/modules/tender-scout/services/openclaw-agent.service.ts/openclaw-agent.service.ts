import { Injectable, Logger, HttpException } from '@nestjs/common';
import WebSocket, { RawData } from 'ws';
import crypto from 'crypto';

@Injectable()
export class OpenClawAgentService {
  private readonly logger = new Logger(OpenClawAgentService.name);
  private readonly MAX_RETRIES = 3;

  private readonly WS_URL = `ws://${process.env.OPENCLAW_HOST}:${process.env.OPENCLAW_PORT}`;
  private readonly TOKEN = process.env.OPENCLAW_TOKEN;

  // Identité device statique pour ce client
  private readonly DEVICE_ID = process.env.DEVICE_ID || 'node_device_001';

  async scrapeAchatPublics(): Promise<any[]> {
    const globalStart = Date.now();

    this.logger.log('========================================');
    this.logger.log('🚀 START scrapeAchatPublics');
    this.logger.log(`Target WS: ${this.WS_URL}`);
    this.logger.log('========================================');

    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      let ws: WebSocket | null = null;
      const attemptStart = Date.now();

      try {
        this.logger.log(`\n[Attempt ${attempt}] Initializing WebSocket...`);

        ws = new WebSocket(this.WS_URL);

        const waitMessage = (): Promise<any> =>
          new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              this.logger.error(`[Attempt ${attempt}] ⏰ TIMEOUT after 120s`);
              ws?.readyState === WebSocket.OPEN && ws.close();
              reject(new Error('Timeout'));
            }, 120000);

            ws!.on('open', () => {
              this.logger.log(`[Attempt ${attempt}] ✅ WebSocket OPEN`);
            });

            ws!.on('message', async (rawMsg: RawData) => {
              const msg = this.rawDataToString(rawMsg);
              this.logger.debug(`[Attempt ${attempt}] 📩 Raw message: ${msg}`);

              try {
                const parsed = JSON.parse(msg);

                // 1️⃣ Handshake challenge
                if (parsed?.type === 'event' && parsed?.event === 'connect.challenge') {
                  const nonce = parsed.payload?.nonce;
                  const ts = parsed.payload?.ts;

                  this.logger.log(`[Attempt ${attempt}] Received connect.challenge`);

                  const signature = this.signDevice(nonce, ts);

                  const connectReq = {
                    type: 'req',
                    id: crypto.randomUUID(),
                    method: 'connect',
                    params: {
                      minProtocol: 3,
                      maxProtocol: 3,
                      client: {
                        id: 'cli',
                        version: '1.0.0',
                        platform: 'nodejs',
                        mode: 'operator',
                      },
                      role: 'operator',
                      scopes: ['operator.read', 'operator.write'],
                      auth: { token: this.TOKEN },
                      device: {
                        id: this.DEVICE_ID,
                        signature,
                        nonce,
                        signedAt: ts,
                      },
                    },
                  };

                  ws!.send(JSON.stringify(connectReq));
                  this.logger.log(`[Attempt ${attempt}] ✅ connect request sent`);

                  return;
                }

                // 2️⃣ Handshake finished
                if (
                  parsed?.type === 'res' &&
                  parsed?.payload?.auth?.deviceToken
                ) {
                  const deviceToken = parsed.payload.auth.deviceToken;
                  this.logger.log(
                    `[Attempt ${attempt}] ✅ Handshake completed. Device token received`
                  );

                  // 3️⃣ Envoi mission après handshake
                  const mission = {
                    type: 'execute',
                    data: {
                      instructions: `
                        Navigate to https://www.achatspublics.sn/
                        Extract all active tenders.
                        Return structured JSON only.
                      `,
                      maxSteps: 20,
                    },
                    auth: { token: deviceToken },
                  };

                  ws!.send(JSON.stringify(mission));
                  this.logger.log(`[Attempt ${attempt}] 🎯 Mission payload sent`);
                  return;
                }

                // 4️⃣ Mission response
                if (parsed?.data) {
                  clearTimeout(timeout);
                  ws?.readyState === WebSocket.OPEN && ws.close();
                  resolve(parsed.data);
                  return;
                }
              } catch (err: any) {
                clearTimeout(timeout);
                ws?.readyState === WebSocket.OPEN && ws.close();
                reject(err);
              }
            });

            ws!.on('error', (err) => {
              clearTimeout(timeout);
              ws?.readyState === WebSocket.OPEN && ws.close();
              reject(err);
            });

            ws!.on('close', (code, reason) => {
              this.logger.warn(`[Attempt ${attempt}] 🔌 WebSocket CLOSED | Code: ${code} | Reason: ${reason}`);
              clearTimeout(timeout);
            });
          });

        const tenders = await waitMessage();

        const validTenders = tenders.filter((t) => t.title && t.organization);

        const duration = Date.now() - attemptStart;

        this.logger.log(`[Attempt ${attempt}] ✅ SUCCESS in ${duration}ms`);
        this.logger.log(`Valid tenders: ${validTenders.length}/${tenders.length}`);
        this.logger.log('========================================');
        this.logger.log(`🏁 TOTAL DURATION: ${Date.now() - globalStart}ms`);
        this.logger.log('========================================');

        return validTenders;
      } catch (error: any) {
        const duration = Date.now() - attemptStart;
        this.logger.error(`[Attempt ${attempt}] ❌ FAILED after ${duration}ms`);
        this.logger.error(error.stack);
        ws?.readyState === WebSocket.OPEN && ws.close();

        if (attempt === this.MAX_RETRIES) {
          this.logger.error('🚨 MAX RETRIES REACHED');
          throw new HttpException('OpenClaw failed', 500);
        }

        this.logger.warn('Retrying...');
      }
    }

    return [];
  }

  private rawDataToString(msg: RawData): string {
    if (typeof msg === 'string') return msg;
    if (Buffer.isBuffer(msg)) return msg.toString();
    if (msg instanceof ArrayBuffer) return Buffer.from(msg).toString();
    if (Array.isArray(msg)) return Buffer.concat(msg).toString();
    return '';
  }

  private signDevice(nonce: string, ts: number): string {
    // ⚠️ Ici tu peux remplacer par une vraie signature selon la clé publique privée
    // Pour test : simple hash sha256 de nonce+ts
    return crypto.createHash('sha256').update(nonce + ts).digest('hex');
  }
}