'use server'

// making sure the returned data is type safe
export interface NewsItem {
        category: string;
        datetime: number;
        headline: string;
        id: number;
        image: string;
        related: string;
        source: string;
        summary: string;
        url: string;
}

// function to fetch the news data using a Rest Api and the Api key provided, response can either be as the defined type or null if there's and error 
export const fetchCompanyNews = async (): Promise<NewsItem[] | null> => {

        // Api key avaliable in the .env file for security purposes
        const token = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

        // handle error if Api key is missing or invalid
        if (!token) {
                console.error('Missing Finnhub API token');
                return null;
        }

        // fetching data using fetch method then store in cache for 5mins to reduce the number of request on the server, also handle diffferent possible errors
        try {
                const res = await fetch(
                        `https://finnhub.io/api/v1/news?general&token=${token}`,
                        {
                                next: { revalidate: 300 },
                                 // 300 seconds = 5 minutes
                        }
                );

                // handle error if theres an error response from the server
                if (!res.ok) {
                        console.error(`Failed to fetch news for: ${res.statusText}`);
                        return null;
                }

                // define the server sucess response using the type defined "NewsItem", then return the response for usable"
                const data: NewsItem[] = await res.json();

                return data;
        } catch (error) {

                // handle case where there's an unexpected error
                console.error('Error fetching news:', error);
                return null;
        }
};
