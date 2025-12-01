export function generateID() {
    return crypto.randomUUID();
}

export function getYearWord(age) {
    age = Math.abs(age) % 100;
    const lastDigit = age % 10;

    if (age > 10 && age < 20) return 'лет';
    if (lastDigit === 1) return 'год';
    if (lastDigit >= 2 && lastDigit <= 4) return 'года';
    return 'лет';
}

export const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

export const isDateOverdue = (dateString) => {
    if (!dateString) return true;

    const visitDate = parseDate(dateString);
    const currentDate = new Date();

    const thresholdDate = new Date(currentDate.setMonth(currentDate.getMonth() - 2));

    return visitDate < thresholdDate;
}

export function compressImage(file, maxWidth = 400, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = e => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL('image/jpeg', quality));
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
