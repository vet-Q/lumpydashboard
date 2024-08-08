import html2canvas from 'html2canvas';

export const downloadImage = async (ref, fileName) => {
    if (!ref.current) {
        console.error('Invalid ref passed to downloadImage function');
        return;
    }
    const canvas = await html2canvas(ref.current, { scale: 3 });
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const link = document.createElement('a');
    link.href = imgData;
    link.download = fileName;
    link.click();
};
