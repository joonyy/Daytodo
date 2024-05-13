const data = {
  name : "주니",
  date : "5월 13일",
  home : "네",
};
function showTodo(){
  //axios : get을 통해 "자세히보기";
  console.log("showTodo 실행");
  axios({
    method:"GET",
    url:"/showTodo",
    params: data,
  }).then((res)=>{
    console.log(res.data.date, " : 백엔드에서 넘어온 data");
  })
}
function isCleared(){
  //axios : patch를 통해 is_clear 항목 바꿔주기
  
}
function editTodo(id){
  //todo 수정하기, axios : get요청을 통해 input들에 data를 뿌려줄거에요
  //get요청 시 받아온 todo id를 보내줘야 해요
  console.log('나는 수정하기인데 이것좀 보여주세요');
  axios({
    method:"GET",
    url:"/editTodo",
    params:data,
  }).then((res)=>{
    console.log(res);
    console.log(res.data.name +' -> 백엔드에서 왔어요');
  }).catch(error=>{
    console.log(error);
  })
  //url:`/date/:todo_id`
  //data: {id:todo_id};
}

function updateTodo(){
  //Todo 항목을 수정할 수 있는 axios : patch 요청이에요. 
  console.log('TODO를 업데이트');
}

function deleteTodo(){
  console.log('TODO 삭제하기');
}

function showCreateTodoText(){
  //+버튼에 hover 시 Todo 작성하기 텍스트 보여주기
  console.log('todo를 만들어볼까요~');
}

function createTodoTuple(){
  //axios POST요청
  const form = document.forms['createTodo'];
  const data = {
    name: form.name.value,
    home: form.home.value
  }
  console.log(data);
  axios({
    method:"POST",
    url:"/newTodo",
    data:data,
  }).then((res)=>{
    alert(res.data.home);
    $('div.hello').append(`
      <h1>${res.data.name}</h1>
      <h1>${res.data.home}</h1>
    `)
  }).catch(err=>{
    console.log(err);
  })

}