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
    __getContent(topics, options = { boldTitle: true }) {
        const { boldTitle } = options;

        let baseUl = `<ul>`;

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
                const childrenContent = this.__getContent(topic.children, { boldTitle: false });
                content = content.concat(childrenContent);
            }

            content = content.concat('</li>');
            baseUl = baseUl.concat(content);
        });

        baseUl = baseUl.concat(`</ul>`);

        return baseUl;
    }

}

export default CreateTopicList;
