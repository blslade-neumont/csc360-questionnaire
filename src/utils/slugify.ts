

const reservedSlugs = ['new', 'list'];
function isValidSlug(slug: string) {
    return reservedSlugs.indexOf(slug) === -1;
}
export function slugify(name: string, model = 'questionnaire', def = 'untitled-questionnaire') {
    let slug = name.toLowerCase().split(/[^a-zA-Z0-9]/).filter(Boolean).join('-');
    if (!isValidSlug(slug)) slug = def;
    if (`${parseInt(slug)}` === slug) slug = `${model}-${slug}`;
    return slug || def;
}
