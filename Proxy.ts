/*control access to an object, allowing an operation to be performed b4 or after access
 The client will call the method of the Proxy object and the proxy will be responsible to call the
 method of the Real Object.client needs to go via the Proxy object. There are 3 types of proxies:
virtual, remote, protection*/


type role = 'normal' | 'ceo';

class Employee{
    name:string;
    password:string;
    role:role;

    constructor(name:string, password:string, role:role){
        this.name = name;
        this.password = password;
        this.role = role;
    }
}

interface ISharedFolder{
    performReadWrite():void;
}

class SharedFolder implements ISharedFolder{
    performReadWrite(): void {
        console.log('Performing Read-Write operations on the Shared Folder');
    }

}

class SharedFolderProxy implements SharedFolder{
    employee:Employee;
    sharedFolder: ISharedFolder;

    constructor(employee:Employee){
        this.employee = employee;
    }

    performReadWrite(): void {
        if(this.employee.role === 'ceo'){
            let folder:SharedFolder = new SharedFolder();
            console.log('Proxy is making a call to performReadWrite in shared folder because you are CEO');
            folder.performReadWrite();
        }
        else{
            console.log('Proxy says you don\'t have read write permission');
        }
        
    }

}

//client
const emp1:Employee = new Employee("Bran", "nvm65432", 'normal');
const emp2:Employee = new Employee("Ian", "ksjh65487", 'ceo');

const proxy = new SharedFolderProxy(emp1);
proxy.performReadWrite();

const proxy2 = new SharedFolderProxy(emp2);
proxy2.performReadWrite();