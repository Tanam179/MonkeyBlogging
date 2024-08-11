import slugify from "slugify";

const useCreateSlug = (str, opt) => {
    const slug = slugify(str, opt || { replacement: '-', remove: undefined, lower: true, locale: 'vi',trim: true });
    console.log(slug);
};

export default useCreateSlug;