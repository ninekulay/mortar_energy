export function saveStandardDataToLocalStorage(data) {
  sessionStorage.setItem('standardData', JSON.stringify(data));
}

export function setMachineListofUser(data) {
    sessionStorage.setItem('lineList', JSON.stringify(data));
}

export function getStandardDataFromLocalStorage() {
    return sessionStorage.getItem('standardData');
}

export function getLineListofUser() {
    return sessionStorage.getItem('lineList');
}