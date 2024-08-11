/* eslint-disable react/prop-types */
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
    ClassicEditor,
    Alignment,
    BlockQuote,
    SimpleUploadAdapter,
    Bold,
    Code,
    CodeBlock,
    Font,
    FontColor,
    Heading,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    Paragraph,
    Strikethrough,
    Table,
    TableCellProperties,
    TableProperties,
    TableToolbar,
    Underline,
    Undo,
} from 'ckeditor5';

// import translations from 'ckeditor5/translations/vi.js';
import 'ckeditor5/ckeditor5.css';

import './CkEditor.css';
import { useEffect } from 'react';

const MyCkEditor = function ({ data, onChange, title }) {
    const MyCustomUploadAdapter = (loader) => {
        return {
            upload: () =>
                new Promise((resolve, reject) => {
                    loader.file
                        .then((file) => {
                            const formData = new FormData();
                            formData.append('file', file);
                            formData.append('upload_preset', 'f2nhweh4'); // Tạo trong Cloudinary
                            formData.append('folder', title); // Tên thư mục muốn lưu ảnh vào

                            fetch('https://api.cloudinary.com/v1_1/ddoznyqyn/image/upload', {
                                method: 'POST',
                                body: formData,
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    resolve({ default: data.secure_url });
                                    console.log('Image uploaded successfully:', data);
                                })
                                .catch((error) => {
                                    console.error('Error uploading image:', error);
                                });
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }),
            abort: () => {},
        };
    };

    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return MyCustomUploadAdapter(loader);
        };
    }

    const editorConfig = {
        alignment: {
            options: ['left', 'right', 'justify'],
        },
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            ],
        },
        mediaEmbed: {
            previewsInData: true,
            extraProviders: [
                {
                    name: 'pdf',
                    url: /\.pdf$/i,
                    html: (match) =>
                        `<div class="ck ck-reset_all ck-media__placeholder">
                            <iframe style="width: 100%; height: 50vh" src=${match.input}
                        </div>`,
                },
            ],
        },
        htmlEmbed: {
            showPreviews: true, // Hiển thị preview của HTML được nhúng
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true,
            },
        },
        fontFamily: {},
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                'fontSize',
                'fontFamily',
                'fontColor',
                'alignment',
                '|',
                'link',
                'insertImage',
                'insertTable',
                'blockQuote',
                '|',
                'bulletedList',
                'numberedList',
                '|',
                'mediaEmbed',
                'codeBlock',
                'htmlEmbed',
            ],
        },
        plugins: [
            Alignment,
            BlockQuote,
            Bold,
            Code,
            CodeBlock,
            FontColor,
            Heading,
            HtmlEmbed,
            ImageBlock,
            ImageCaption,
            ImageInline,
            ImageInsert,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            Italic,
            Link,
            LinkImage,
            List,
            ListProperties,
            MediaEmbed,
            Paragraph,
            SimpleUploadAdapter,
            Strikethrough,
            Table,
            TableCellProperties,
            TableProperties,
            TableToolbar,
            Underline,
            Undo,
            Font,
        ],
        image: {
            toolbar: [
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'imageStyle:inline',
                'imageStyle:wrapText',
                'imageStyle:breakText',
                '|',
                'resizeImage',
            ],
        },
        initialData: '',
        language: 'vi',
        placeholder: 'Type or paste your content here!',
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
        },
        extraPlugins: [MyCustomUploadAdapterPlugin],
        // translations: [translations],
    };

    return <CKEditor editor={ClassicEditor} config={editorConfig} data={data} onChange={onChange} />;
};

export default MyCkEditor;
