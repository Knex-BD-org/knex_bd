export const compressImageClient = (file: File, maxSizeMB: number = 0.8, maxWidthOrHeight: number = 1920): Promise<File> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Scale down if larger than maxWidthOrHeight
                if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
                    if (width > height) {
                        height = Math.round((height * maxWidthOrHeight) / width);
                        width = maxWidthOrHeight;
                    } else {
                        width = Math.round((width * maxWidthOrHeight) / height);
                        height = maxWidthOrHeight;
                    }
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    return resolve(file); // fallback to original if canvas fails
                }

                ctx.drawImage(img, 0, 0, width, height);

                // Start with high quality, and gradually reduce to hit size limit if needed
                let quality = 0.9;
                const compress = () => {
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) return resolve(file);

                            // If blob is smaller than maxSizeMB or quality is very low, resolve
                            if (blob.size / 1024 / 1024 <= maxSizeMB || quality <= 0.1) {
                                const compressedFile = new File([blob], file.name, {
                                    type: "image/jpeg",
                                    lastModified: Date.now(),
                                });
                                resolve(compressedFile);
                            } else {
                                quality -= 0.1;
                                compress();
                            }
                        },
                        "image/jpeg",
                        quality
                    );
                };
                compress();
            };
            img.onerror = (err) => {
                reject(err);
            };
        };
        reader.onerror = (err) => {
            reject(err);
        };
    });
};
