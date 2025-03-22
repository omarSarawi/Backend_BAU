let students=[];
function createStudent(name,age,mark){
    return{name:name,age:age,mark:mark};
}

students.push(createStudent("kattab",20,70));
students.push(createStudent("deema",20,77));
students.push(createStudent("omar",20,10));
students.push(createStudent("ali",20,82));

let successStudent=[];

let failedStudent=[];

for(let i=0;i<students.length;i++){
    if(students[i].mark>=50){
successStudent.push(students[i]);}
    else{
failedStudent.push(students[i]);}
}

console.log("success Student",successStudent);
console.log("failed Student",failedStudent);
