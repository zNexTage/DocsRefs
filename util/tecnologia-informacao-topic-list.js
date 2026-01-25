import TecnologiaInformacao from "../dados/tecnologia-informacao.js";
import CreateTopicList from "./create-topic-list.js";

class TecnologiaInformacaoTopicList extends CreateTopicList {
    getData() {
        return TecnologiaInformacao;
    }

    getLastUpdatedDate(){
        return "25/01/2026 - 13h00";
    }
}

customElements.define('tecnologia-informacao-topic-list', TecnologiaInformacaoTopicList);