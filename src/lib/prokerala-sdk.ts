// @ts-nocheck
class ProkeralaAstrologer {
    constructor(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.apiEndpoint = 'https://api.prokerala.com/v2';
        this.token = null;
    }
    async fetchToken() {
        const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
        const response = await fetch('https://api.prokerala.com/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch token: ${response.statusText}`);
        }
        const data = await response.json();
        this.token = data.access_token;
    }
    async get(path, params) {
        if (!this.token) {
            await this.fetchToken();
        }
        const url = new URL(`${this.apiEndpoint}${path}`);
        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        }
        
        let response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
        });

        if (response.status === 401) {
            // Token might have expired, fetch a new one and retry
            await this.fetchToken();
            response = await fetch(url.toString(), {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                },
            });
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed: ${response.statusText} - ${errorText}`);
        }

        return response.json();
    }
    async getPanchangFestivals(location, year, religiousOnly, ayanamsa, language) {
        return this.get('/astrology/panchang-festivals', {
            'location': `${location.latitude},${location.longitude}`,
            'year': year,
            'religious_only': religiousOnly,
            'ayanamsa': ayanamsa,
            'la': language,
        });
    }
}
export { ProkeralaAstrologer };
