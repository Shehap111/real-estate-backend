import limax from 'limax';

const title = "شقة ٣ غرف في المعادي";
const result = limax(title, { lang: 'ar' });

console.log("Slug generated:", result);
