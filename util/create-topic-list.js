class TopicItem {
    title = null;
    link = null;
    description = null;
    children = [];

    /**
     * 
     * @param {string} title 
     * @param {string} link 
     * @param {string} description 
     * @param {Array<TopicItem>} children 
     */
    constructor(title, link, description = '', children = []) {
        this.title = title;
        this.link = link;
        this.description = description;
        this.children = children;
    }
}

class CreateTopicList extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        const data = this.getData();

        const content = this.__getContent(data);

        this.innerHTML = content;
        this.innerHTML += `<hr/>`;
        this.innerHTML += `<p class="m-0"><em>Autor: ${this.getAuthor()}</em></p>`;
        this.innerHTML += `<p><em>Última atualização: ${this.getLastUpdatedDate()}</em></p>`;
    }

    /**
     * 
     * @returns {Array<TopicItem>}
     */
    getData() {
        return [];
    }

    /**
     * Monta a lista de tópicos que será exibida no componente.
     * @param {Array<TopicItem>} topics 
     * @param {Object} options
     * @param {boolean} options.boldTitle Define se o título do tópico será exibido em negrito.
     * @returns {string} Conteúdo HTML da lista de tópicos.
     */
    __getContent(topics, options = { boldTitle: true, ulStyle: { padding: 0, listStylePosition: 'inside' } }) {
        const { boldTitle, ulStyle } = options;

        let ulStyleString = '';

        if (!!ulStyle) {
            ulStyleString = Object.entries(ulStyle).map(([key, value]) => {
                return `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`;
            }).join(' ');
        }

        let baseUl = `<ul style="${ulStyleString}">`;

        topics.forEach(topic => {

            const title = boldTitle ? `<strong>${topic.title}</strong>` : topic.title;

            let content = `
                        <li>
                            ${!!topic.link ? `
                            <a target="__blank" href="${topic.link}">
                                ${title}
                            </a>`
                    :
                    title
                }
                            ${topic.description ? `<p>${topic.description}</p>` : ''}                
                `;

            if (topic.children && topic.children.length > 0) {
                const childrenContent = this.__getContent(topic.children, { boldTitle: false, ulStyle: null });
                content = content.concat(childrenContent);
            }

            content = content.concat('</li>');
            baseUl = baseUl.concat(content);
        });

        baseUl = baseUl.concat(`</ul>`);

        return baseUl;
    }

    getAuthor() {
        return "Christian Bueno";
    }

    getLastUpdatedDate() {
        return "";
    }
}

export default CreateTopicList;
