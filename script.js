window.onload=()=>
{
    //p1controls
    p1imgdiv=document.querySelector("#p1img")
    p1titlediv=document.querySelector("#p1title")
    p1damagestatsdiv=document.getElementById("p1damagestats")
    p1healthincdiv=document.getElementById("p1healthinc")
    p1healthdiv=document.querySelector("#p1health")

    //p2controls
    p2titlediv=document.querySelector("#p2title")
    p2imgdiv=document.querySelector("#p2img")
    p2damagestatsdiv=document.getElementById("p2damagestats")
    p2healthincdiv=document.getElementById("p2healthinc")
    p2healthdiv=document.querySelector("#p2health")

    //audio
    fasthealdiv=document.querySelector("#fastheal")
    quickhitdiv=document.querySelector("#quickhit")
    fastpunchdiv=document.querySelector("#fastpunch")
    quickhealdiv=document.querySelector("#quickheal")
    victorydiv=document.querySelector("#victory")

    //displays
    resultcontainerdiv=document.querySelector("#resultcontainer")
    resultdiv=document.querySelector("#result")
    scorediv=document.querySelector("#score")

    //buttons
    resetdiv=document.querySelector("#reset")
    stimulatediv=document.querySelector("#stimulate")
   
   var p1id= Math.ceil(Math.random()*720)
   var p2id= Math.ceil(Math.random()*720)

   var p1healpoints=Math.ceil(Math.random()*10)
   var p2healpoints=Math.ceil(Math.random()*10)

   var p1attackpoints=Math.ceil(Math.random()*20)
   var p2attackpoints=Math.ceil(Math.random()*20)

   var p1health=100
   var p2health=100
   var isover=false

   var p1score=0
   var p2score=0

   setdata=(imgdiv,titlediv,id,healthincdiv,healpoints)=>{
    fetch(`https://superheroapi.com/api.php/103643096130261/${id}`)
    .then(res=>res.json())
    .then(data=>{
        imgdiv.innerHTML= `<img src="${data.image.url}" alt="${data.name}" class="pimg">`
        titlediv.innerHTML=`${data.name}`
        healthincdiv.innerHTML=`+ ${healpoints} HP for ${data.name}`
        console.log(data.image.url,data.name)
    })
   }
   setdata(p1imgdiv,p1titlediv,p1id,p1healthincdiv,p1healpoints)
   setdata(p2imgdiv,p2titlediv,p2id,p2healthincdiv,p2healpoints)
   
   
   p2healthincdiv.innerHTML=`+ ${p2healpoints} HP for player2`

   p1damagestatsdiv.innerHTML=`- ${p1attackpoints} HP for player 2`
   p2damagestatsdiv.innerHTML=`- ${p2attackpoints} HP for player 1`

   p2healthdiv.innerHTML=`${p2health}`
   p1healthdiv.innerHTML=`${p1health}`

   resetdiv.onclick=()=>{
    p1health=100
    p2health=100
    p1healthdiv.innerHTML=`${p1health}`
    p2healthdiv.innerHTML=`${p2health}`
    resultcontainerdiv.style.display="none"
    isover=false
   }
   p1attack=()=>
   {
    fastpunchdiv.play()
    resultdiv.innerHTML=`Player 1 attacks`
    resultcontainerdiv.style.display="block"
   
    if((p2health>p1attackpoints && p2health>0) && isover==false)
    {
    p2health=p2health-p1attackpoints
    p2healthdiv.innerHTML=`${p2health}`
    }
    else{
        p2health=0
        p2healthdiv.innerHTML=`DEAD`
        isover=true
        victorydiv.play()
        p1score +=1
        resultdiv.innerHTML=`Player 1 Won`
        scorediv.innerHTML=`Player 1: ${p1score} <br> Player 2: ${p2score}`
    }
   }

   document.addEventListener("keydown",(e)=>{
    if(e.key=='q' && isover==false)
    {
       p1attack()
             
    }
   })
  
   p2attack=()=>{
    quickhitdiv.play()
    resultdiv.innerHTML=`Player 2 attacks`
    resultcontainerdiv.style.display="block"
   
    if(((p1health>p2attackpoints && p1health>0)) && isover==false)
    {
    p1health=p1health-p2attackpoints
    p1healthdiv.innerHTML=`${p1health}`
    }
    else{
        p1health=0
        p1healthdiv.innerHTML=`DEAD`
        isover=true
        victorydiv.play()
        p2score +=1
        resultdiv.innerHTML=`Player 2 Won`
        scorediv.innerHTML=`Player 1: ${p1score} <br> Player 2: ${p2score}`
        
    }
   }

   document.addEventListener("keydown",(e)=>{
    if(e.key=='p' && isover==false)
    {
       p2attack()
             
    }
   })

   p1heal=()=>{
      
    if(p1health+p1healpoints<101 && isover==false)
    {
        p1health+= p1healpoints
        fasthealdiv.play()
    resultdiv.innerHTML=`Player 1 Heals`
    }
    else{
        p1health=100
    }
    p1healthdiv.innerHTML=`${p1health}`
   }

   document.addEventListener("keydown",(e)=>{
    if(e.key=='a')
    {
      p1heal()
    }
   })

   p2heal=()=>{
    if(p2health+p2healpoints<101 && isover==false)
    {
        p2health+= p2healpoints
        quickhealdiv.play()
    resultdiv.innerHTML=`Player 2 Heals`
    }
    else{
        p2health=100
    }
    p2healthdiv.innerHTML=`${p2health}`
   }
   document.addEventListener("keydown",(e)=>{
    if(e.key=='l')
    {
        
       p2heal()
    }
   })
  
   stimulatediv.onclick=()=>
   {
    let a=Math.ceil(Math.random()*3)
    if(a==1)
    {
        console.log("p1")
        
        while(isover==false) {
        p1attack()
        p2attack()
        p1heal()
        p2heal()
        }
        p1attack()
        
    }
    else 
    {
        console.log("p2")
        while(isover==false)
        {
        p2attack()
        p1attack()
        p2heal()
        p1heal()
        }
        p2attack()
        
    }
   }

   

/*
    
     setp1data=async()=>
   {
    try{
    var p1id= Math.ceil(Math.random()*720)
    const response= await fetch(`https://superheroapi.com/api.php/103643096130261/${p1id}`)
    const data= await response.json()
    p1imgdiv=document.querySelector("#p1img")
    p1titlediv=document.querySelector("#p1title")
    p1imgdiv.innerHTML=`<img src="${data.image.url}" alt="${data.name}" class="pimg">`
    p1titlediv.innerHTML=`${data.name}`
    console.log(data.image.url,data.name)
    }
    catch(err)
    {
        console.log(err)
   }
   }
   setp1data()
   })
*/
}