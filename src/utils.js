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