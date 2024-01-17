export function generateExperienceTenure(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate !== 'Present' ? new Date(endDate) : new Date(); // Use current date if endDate is not provided
  
    const startYear = start.getFullYear();
    const startMonth = start.toLocaleString('default', { month: 'long' });
    
    const endYear = end.getFullYear();
    const endMonth = end.toLocaleString('default', { month: 'long' });
  
    const durationInMonths = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
    const years = Math.floor(durationInMonths / 12);
    const months = durationInMonths % 12;
  
    let durationString = '';
    if (years > 0) {
      durationString += `${years} ${years === 1 ? 'year' : 'years'}`;
    }
    if (months > 0) {
      durationString += `${years > 0 ? ' ' : ''}${months} ${months === 1 ? 'month' : 'months'}`;
    }
  
    const tenureString = `${startMonth} ${startYear} - ${ endDate !== 'Present' ? `${endMonth} ${endYear}` : 'Present'}`;
    
    return { tenureString, durationString };
  }
  

  