"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BannerItem {
    url: string;
    href?: string;
}

interface BannerProps {
    images: BannerItem[];
    autoSlide?: boolean;
    interval?: number;
}

export default function Banner({ images, autoSlide = true, interval = 5000 }: BannerProps) {
    const [current, setCurrent] = useState(0);
    const [key, setKey] = useState(0);

    useEffect(() => {
        if (!autoSlide || images.length <= 1) return;
        const timer = setInterval(() => setCurrent((prev) => (prev + 1) % images.length), interval);
        return () => clearInterval(timer);
    }, [autoSlide, interval, images.length, key]);

    const next = () => {
        setCurrent((prev) => (prev + 1) % images.length);
        setKey((prev) => prev + 1);
    };
    const prev = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
        setKey((prev) => prev + 1);
    };

    if (!images || images.length === 0) return null;

    return (
        <div suppressHydrationWarning className="relative overflow-hidden rounded-xl md:rounded-2xl group w-full aspect-2.5/1 sm:aspect-3.5/1 md:aspect-4.5/1 lg:aspect-5/1 bg-transparent">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((image, idx) => {
                    const content = (
                        <Image
                            src={image.url}
                            alt={`Banner ${idx + 1}`}
                            fill
                            className="object-contain object-center cursor-pointer"
                            priority={idx === 0}
                        />
                    );

                    return (
                        <div key={idx} className="min-w-full h-full relative">
                            {image.href ? (
                                <Link href={image.href} className="block w-full h-full">
                                    {content}
                                </Link>
                            ) : (
                                content
                            )}
                        </div>
                    );
                })}
            </div>

            {images.length > 1 && (
                <>
                    <button onClick={prev} className="cursor-pointer absolute hidden md:block left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 md:p-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
                        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button onClick={next} className="cursor-pointer absolute hidden md:block right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 md:p-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setCurrent(idx); setKey((prev) => prev + 1); }}
                                className={`h-2 rounded-full transition-all relative overflow-hidden ${current === idx ? "w-8" : "w-2"} bg-gray-300`}
                            >
                                {current === idx && autoSlide && (
                                    <div
                                        key={key}
                                        className="absolute inset-0 bg-blue-600 origin-left"
                                        style={{
                                            animation: `fillBar ${interval}ms linear`,
                                            transformOrigin: 'left',
                                        } as React.CSSProperties & { animation: string }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
            <style>{`
                @keyframes fillBar {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
            `}</style>
        </div>
    );
}
