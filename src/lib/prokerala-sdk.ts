// @ts-nocheck
class ProkeralaAstrologer {
    constructor(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.apiEndpoint = 'https://api.prokerala.com';
        this.tokenCache = { token: null, expires: 0 };
    }
    
    async fetchToken() {
        const now = Date.now();
        if (this.tokenCache.token && now < this.tokenCache.expires) {
            return this.tokenCache.token;
        }

        const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
        
        const response = await fetch(`${this.apiEndpoint}/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch token: ${response.status} ${response.statusText}`, errorText);
            throw new Error(`Failed to fetch token: ${response.statusText}`);
        }

        const data = await response.json();
        this.tokenCache = {
            token: data.access_token,
            expires: now + (data.expires_in - 60) * 1000,
        };
        return this.tokenCache.token;
    }

    async get(path, params) {
        const token = await this.fetchToken();
        const url = new URL(`${this.apiEndpoint}${path}`);
        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        }

        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API request failed: ${response.statusText} - ${errorText}`);
             return { status: 'error', errors: [{detail: `API request failed: ${response.statusText}`}]};
        }
        
        return response.json();
    }

    async getDailyPanchang(datetime, coordinates, ayanamsa = 1, language = 'en') {
        return this.get('/v2/astrology/panchang', {
            datetime,
            coordinates,
            ayanamsa,
            la: language,
        });
    }
}
export { ProkeralaAstrologer };
