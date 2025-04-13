"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react';
import Image from 'next/image'; // Import Next.js Image component

// MediaItemType defines the structure of a media item
interface MediaItemType {
    id: number | string; // Allow string IDs from project data
    type: 'image' | 'video';
    title: string;
    desc: string;
    url: string;
    span: string; // Tailwind classes for grid span (e.g., 'md:col-span-2 md:row-span-2')
}
// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null); // Reference for video element
    const [isInView, setIsInView] = useState(false); // To track if video is in the viewport
    const [isBuffering, setIsBuffering] = useState(item.type === 'video');  // To track if video is buffering

    // Intersection Observer to detect if video is in view and play/pause accordingly
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting); // Set isInView to true if the video is in view
            });
        }, options);

        const currentVideoRef = videoRef.current; // Capture ref value
        if (currentVideoRef) {
            observer.observe(currentVideoRef); // Start observing the video element
        }

        return () => {
            if (currentVideoRef) {
                observer.unobserve(currentVideoRef); // Clean up observer when component unmounts
            }
        };
    }, []); // Empty dependency array ensures this runs only once

    // Handle video play/pause based on whether the video is in view or not
    useEffect(() => {
        let mounted = true;
        const currentVideoRef = videoRef.current; // Capture ref value

        const handleVideoPlay = async () => {
            if (!currentVideoRef || !isInView || !mounted) return; // Don't play if video is not in view or component is unmounted

            try {
                if (currentVideoRef.readyState >= 3) { // HAVE_FUTURE_DATA or more
                    setIsBuffering(false);
                    await currentVideoRef.play(); // Play the video if it's ready
                } else {
                    setIsBuffering(true);
                    // Use event listener for better reliability
                    const canPlayHandler = async () => {
                        if (mounted && isInView && currentVideoRef) { // Check ref again inside handler
                            setIsBuffering(false);
                            await currentVideoRef.play();
                        }
                        // Ensure listener is removed even if component unmounts before canplay
                        currentVideoRef?.removeEventListener('canplay', canPlayHandler);
                    };
                    currentVideoRef.addEventListener('canplay', canPlayHandler);
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
                if (mounted) setIsBuffering(false); // Ensure buffering state is reset on error
            }
        };

        if (isInView && currentVideoRef) {
            handleVideoPlay();
        } else if (currentVideoRef) {
            currentVideoRef.pause();
            setIsBuffering(true); // Assume buffering when paused/out of view
        }

        return () => {
            mounted = false;
            if (currentVideoRef) {
                currentVideoRef.pause();
            }
        };
    }, [isInView]); // Re-run when isInView changes

    // Render either a video or image based on item.type

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden bg-black`}> {/* Added bg-black */}
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover cursor-pointer" // Added cursor-pointer
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="metadata" // Changed from auto to metadata
                    poster={item.url.replace('.mp4', '.jpg')} // Assume poster convention
                    style={{
                        opacity: isBuffering ? 0.5 : 1, // Dim video when buffering
                        transition: 'opacity 0.3s',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none"> {/* Darker overlay */}
                        <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin" /> {/* Adjusted spinner style */}
                    </div>
                )}
            </div>
        );
    }

    // Use Next.js Image component
    return (
        <Image
            src={item.url}
            alt={item.title || item.desc || 'Gallery image'}
            className={`${className} object-cover cursor-pointer`} // Removed w-full h-full, handled by fill
            onClick={onClick}
            fill // Use fill to cover parent container
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" // Example sizes, adjust as needed
            priority={false} // Set priority based on context if needed
            loading="lazy"
        />
    );
};

// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
    selectedItem: MediaItemType;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[]; // List of media items to display in the modal
}
const GalleryModal = ({ selectedItem, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {

    // Effect for keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!selectedItem || mediaItems.length <= 1) return;

            const currentIndex = mediaItems.findIndex(item => item.id === selectedItem.id);
            if (currentIndex === -1) return;

            let nextIndex = -1;

            if (event.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % mediaItems.length;
            } else if (event.key === 'ArrowLeft') {
                nextIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
            }

            if (nextIndex !== -1) {
                setSelectedItem(mediaItems[nextIndex]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedItem, mediaItems, setSelectedItem]);

    return (
        <>
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-lg z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            {/* Modal Container */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-0 m-auto w-[95vw] h-[90vh] max-w-6xl max-h-[85vh]
                           rounded-2xl md:rounded-3xl overflow-visible shadow-2xl z-50 flex flex-col"
            >
                 {/* Close Button */}
                <motion.button
                    className="absolute top-3 right-3 z-[70] p-2 rounded-full bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                >
                    <X className='w-5 h-5' />
                </motion.button>

                {/* Media Display Area */}
                <div className="flex-1 p-6 md:p-8 flex items-center justify-center overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedItem.id}
                            className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-inner"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MediaItem item={selectedItem} className="w-full h-full object-contain" />
                             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                                <h3 className="text-lg font-semibold text-white truncate">{selectedItem.title}</h3>
                                {selectedItem.desc && <p className="text-sm text-white/80 mt-1 truncate">{selectedItem.desc}</p>}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* New Thumbnail Dock */}
            <motion.div
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
            >
              <div className="flex items-center justify-center p-2 rounded-xl bg-background/60 dark:bg-neutral-800/60 backdrop-blur-md border border-border/50 shadow-lg">
                <div className="flex items-end -space-x-4">
                  {mediaItems.map((item, index) => { // index is used for alternating tilt
                    const isActive = selectedItem.id === item.id;
                    const thumbnailClasses = `
                      relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer shadow-md
                      ring-2 ring-offset-2 ring-offset-background/60 dark:ring-offset-neutral-800/60
                      transition-all duration-300 ease-out
                      ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'}
                      ${isActive ? 'ring-primary scale-110 z-10 !rotate-0' : 'ring-transparent hover:scale-105 hover:z-[5] hover:!rotate-0'}
                    `;
                    return (
                      <motion.div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={thumbnailClasses}
                        style={{ zIndex: isActive ? 10 : mediaItems.length - index }}
                        layoutId={`thumbnail-${item.id}`}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        {/* Use Next/Image for thumbnails */}
                        <Image
                          src={item.type === 'video' ? item.url.replace('.mp4', '.jpg') : item.url}
                          alt={item.title}
                          className="object-cover rounded-lg" // Match parent rounding
                          fill // Use fill layout
                          sizes="48px" // Provide appropriate size hint
                          loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10"></div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
        </>
    );
};

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[];
    title?: string;
    description?: string;
    className?: string;
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({
    mediaItems = [],
    title,
    description,
    className = ''
}) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);

    const handleItemClick = (item: MediaItemType) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const validMediaItems = Array.isArray(mediaItems) ? mediaItems : [];

    return (
        // Removed container, mx-auto, px-4. Kept py and className prop.
        <div className={`py-8 md:py-12 ${className}`}>
            {(title || description) && (
                <div className="mb-8 md:mb-12 text-center">
                    {title && (
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5 }}
                        >
                            {title}
                        </motion.h2>
                    )}
                    {description && (
                        <motion.p
                            className="mt-2 text-base text-muted-foreground max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {description}
                        </motion.p>
                    )}
                </div>
            )}
            {/* Bento Grid */}
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                }}
            >
                {/* Removed unused index from map */}
                {validMediaItems.map((item) => (
                    <motion.div
                        key={item.id}
                        layoutId={`media-${item.id}`}
                        className={`relative overflow-hidden rounded-lg md:rounded-xl shadow-sm cursor-pointer group ${item.span || 'col-span-1 row-span-1'}`}
                        onClick={() => handleItemClick(item)}
                        variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } }
                        }}
                        whileHover={{ scale: 1.03, zIndex: 10, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                    >
                        <div className="absolute inset-0 w-full h-full">
                            <MediaItem
                                item={item}
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 pointer-events-none">
                            <motion.h3
                                className="text-white text-xs sm:text-sm font-medium line-clamp-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                            >
                                {item.title}
                            </motion.h3>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <GalleryModal
                        selectedItem={selectedItem}
                        onClose={handleCloseModal}
                        setSelectedItem={setSelectedItem}
                        mediaItems={validMediaItems}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBentoGallery;

// Note: Ensure 'tailwind-scrollbar' plugin is installed if using scrollbar utilities.
// Example: npm install -D tailwind-scrollbar
// In tailwind.config.js: plugins: [require('tailwind-scrollbar'),],
