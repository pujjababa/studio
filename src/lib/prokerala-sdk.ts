// A simple SDK for the Prokerala API
const API_BASE_URL = 'https://api.prokerala.com';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export class ProkeralaAstrologer {
  private clientId?: string;
  private clientSecret?: string;
  private token: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor(clientId?: string, clientSecret?: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  public async fetchToken(): Promise<string> {
    const now = Date.now();
    if (this.token && now < this.tokenExpiresAt) {
      return this.token;
    }

    if (!this.clientId || !this.clientSecret) {
      throw new Error(
        'Prokerala client ID and secret are not configured in environment variables.'
      );
    }
    
    const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

    const response = await fetch(`${API_BASE_URL}/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Token API Error Body:", errorBody);
      throw new Error(`Failed to fetch token: ${response.statusText}`);
    }

    const data: TokenResponse = await response.json();
    this.token = data.access_token;
    this.tokenExpiresAt = now + (data.expires_in - 300) * 1000; // Refresh 5 mins before expiry
    return this.token;
  }

  private async get(path: string, params: Record<string, string>, token?: string) {
    const authToken = token || await this.fetchToken();
    const url = new URL(`${API_BASE_URL}${path}`);
    
    for(const key in params) {
        url.searchParams.append(key, params[key]);
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }
    
    const jsonResponse = await response.json();
    if (jsonResponse.status === 'error') {
        throw new Error(`API returned an error: ${jsonResponse.errors?.[0]?.detail || 'Unknown error'}`);
    }
    return jsonResponse.data;
  }

  public async getDailyPanchang(date: Date, latitude: number, longitude: number, token?: string) {
    const datetime = `${date.toISOString().split('T')[0]}T09:00:00+05:30`;
    return this.get('/v2/astrology/panchang', {
      ayanamsa: '1', // Lahiri
      coordinates: `${latitude},${longitude}`,
      datetime: datetime,
    }, token);
  }
}
