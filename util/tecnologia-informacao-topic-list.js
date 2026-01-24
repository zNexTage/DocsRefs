import TecnologiaInformacao from "../dados/tecnologia-informacao.js";
import CreateTopicList from "./create-topic-list.js";

class TecnologiaInformacaoTopicList extends CreateTopicList {
    getData() {
        return TecnologiaInformacao;
    }
}

customElements.define('tecnologia-informacao-topic-list', TecnologiaInformacaoTopicList);