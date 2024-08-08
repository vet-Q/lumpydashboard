import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// 현재 날짜를 "YYYY-MM-DD" 형식으로 반환하는 함수
const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// PDF 생성 함수
const generateReport = async (refs, statValues) => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    let yOffset = 20;

    const currentDate = getCurrentDate();

    // 제목 추가 (Add title)
    pdf.setFontSize(24);
    pdf.text('Daily Report', 10, yOffset);
    pdf.setFontSize(10);
    pdf.text(currentDate, 180, yOffset, { align: 'right' });
    yOffset += 20;

    // 통계 박스 설명 추가 (Add StatBox description)
    pdf.setFontSize(12);
    pdf.text(`The number of outbreak LSD today is:  ${statValues[0]}`, 10, yOffset);
    yOffset += 10;

    // 각 컴포넌트를 캡처하여 PDF에 추가 (Capture each component and add to PDF)
    const addComponentToPDF = async (ref, description) => {
        const canvas = await html2canvas(ref.current, { scale: 3 });
        const imgData = canvas.toDataURL('image/png');
        const imgProperties = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        if (yOffset + pdfHeight > pdf.internal.pageSize.getHeight() - 20) {
            pdf.addPage();
            yOffset = 20;
        }

        pdf.setFontSize(12);
        pdf.text(description, 10, yOffset);
        yOffset += 10;
        pdf.addImage(imgData, 'PNG', 10, yOffset, pdfWidth, pdfHeight);
        yOffset += pdfHeight + 10;
    };

    for (let i = 0; i < refs.length; i++) {
        await addComponentToPDF(refs[i].ref, refs[i].description);
    }

    pdf.save("report.pdf");
};

export default generateReport;
