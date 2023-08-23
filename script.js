//dont use eval() function and 
//dont return a new function that evaluates a stirng.
//both these practices are not to use as they can cause security issues

function add(arr){
let sum=0;
for(let i=0;i<arr.length;i++){
sum+=arr[i];
}
return sum
};
console.log(add([-5,6,7,-2]));



function subtract(arr){
let diff=arr[0];
for(let i=1;i<arr.length;i++){
diff-=arr[i];
}
return diff;
};
console.log(subtract([52,26,13]));

function multiply(arr){
let prod=arr[0];
for(let i=1;i<arr.length;i++){
prod*=arr[i];
}
return prod;
};
console.log(multiply([2,3,8,10]))

function divide(arr){
let div=arr[0];
for(let i=1;i<arr.length;i++){
div/=arr[i];
}
return div;
};
console.log(divide([8,4,2]))
