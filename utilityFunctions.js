import axios from 'axios'

export function isToxic(inputStr){
    return axios.get("http://127.0.0.1:5000/toxicity",{mode:"no-cors",params:{input:inputStr}}).then((response) => response.data.isToxic)
}

export function getAdditionalInfo(inputStr){
    return axios.get("http://127.0.0.1:5000/info",{mode:"no-cors",params:{input:inputStr}}).then((response) => response.data.summary)

}

export function getDrugRecommendations(inputStr){
    return axios.get("http://127.0.0.1:5000/recommendations",{mode:"no-cors",params:{input:inputStr}}).then((response) => response.data.recommendations)
}