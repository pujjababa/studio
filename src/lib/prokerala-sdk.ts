
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
            const errorText = await response.text();
            console.error(`Failed to fetch token: ${response.statusText}`, errorText);
            throw new Error(`Failed to fetch token: ${response.statusText}`);
        }
        const data = await response.json();
        this.token = data.access_token;
    }
    async get(path, params) {
        if (!this.token) {
            await this.fetchToken();
        }
        
        const url = new URL(`${this.apiEndpoint}/${path}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            
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
            console.error(`API request failed: ${response.statusText} - ${errorText}`);
            try {
                // Try to parse error response as JSON
                return JSON.parse(errorText);
            }
            catch (e) {
                // If not JSON, return a generic error
                return { status: 'error', errors: [{detail: `API request failed: ${response.statusText}`}]};
            }
        }

        const jsonResponse = await response.json();

        if (jsonResponse.status === 'error') {
            return jsonResponse;
        }

        // Ensure data exists before returning
        return {
            status: 'success',
            data: jsonResponse.data ?? {}
        };
    }

    async getDailyPanchang(datetime, coordinates, ayanamsa = 1, language = 'en') {
        return this.get('astrology/panchang', {
            datetime,
            coordinates,
            ayanamsa,
            la: language,
        });
    }

    async getPanchangFestivals(location, year, religiousOnly = true, ayanamsa = 1, language = 'en') {
        return this.get('astrology/panchang-festivals', {
            'coordinates': `${location.latitude},${location.longitude}`,
            'year': year,
            'religious_only': religiousOnly,
            'ayanamsa': ayanamsa,
            'la': language,
        });
    }
}
export { ProkeralaAstrologer };
