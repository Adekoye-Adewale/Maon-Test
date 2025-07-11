import React from 'react'
import { fetchCompanyNews } from '@/lib/client';
import Image from 'next/image';
import Link from 'next/link';

// function to convert the raw date data to a standard readable format
function formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
        });
}

export const FetchedNewsList = async () => {

        // access the news data from the fetch function in the client.tx component
        const news = await fetchCompanyNews();

        return (
                <div className="p-4 md:py-10 md:px-12">
                        <h2 className="text-2xl md:text-5xl font-medium uppercase mb-4">
                                News
                        </h2>
                
                        {/* handle error or success response state in the UI for good user experience */}
                        {news === null ? (
                                <p className="text-base md:text-xl font-medium">
                                        Something went wrong. Please try again later.
                                </p>
                        ) : news.length === 0 ? (
                                <p>
                                        No news available.
                                </p>
                        ) : (
                        <div className="space-y-4 grid gap-2 md:gap-6 md:grid-cols-2 lg:grid-cols-4">

                                {/* map the news data to display properly in the UI */}
                                {news.map((item) => (
                                        <Link 
                                                href={item.url} 
                                                title={`Click to read more`}
                                                target="_blank"
                                                rel="noopener noreferrer" 
                                                key={item.id} 
                                                className="flex md:flex-col gap-4 md:gap-2 p-4 cursor-pointer hover:bg-[#2A283E] transition-all duration-300"
                                        >
                                                <div>
                                                        <Image
                                                                src={item.image || '/no-image.svg'}
                                                                alt={item.headline}
                                                                title={item.headline}
                                                                height={500}
                                                                width={300}
                                                                className="max-w-[100px] md:max-w-[500px] size-[100px] md:size-full object-cover md:aspect-video"
                                                        />
                                                </div>
                                                <div>
                                                        <div className='flex justify-between opacity-70 text-xs font-normal uppercase'>
                                                                <p>
                                                                        {item.source}
                                                                </p>
                                                                <p>
                                                                        {formatDate(item.datetime)}
                                                                </p>
                                                        </div>
                                                        <h3 className="font-medium text-white text-[20px]">
                                                                {item.headline}
                                                        </h3>
                                                </div>
                                        </Link>
                                ))}
                        </div>
                        )}
                </div>
        );
};
      