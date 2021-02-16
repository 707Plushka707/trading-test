
class A {

    #name;
    constructor(name) {
        this.name = name;
    }

    sayhello() {
        console.log("hello");
        this.run();

    }
}

class B extends A {

    run() {
        console.log("B run" + this.name);
    }
}


let bb = new B("xx");
bb.sayhello();
bb.run();