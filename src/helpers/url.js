const url = {
    name: "http://127.0.0.1:8000/",
    make(str) {
        return this.name + str;
    }
}

export default url;