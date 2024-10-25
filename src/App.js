import './index.css';
import './laptop.css';
import './tablet.css';
import './mobile.css'
import { useState, useEffect, useRef } from 'react';

import placeholder from "./always.png"
import arrow from "./arrow.svg"
import most from "./most.png"
import logo from "./FilmReel.svg"
import menu from "./menu.svg"
import cross from "./cross.svg"

export default function App() {
  const list = [
    {
      title: "Quick Links",
      elements: [
        "Home",
        "About",
        "Quiz",
        "Contact"
      ]
    },
    {
      title: "Explore More",
      elements: [
        "FAQ",
        "Gallery",
        "Events",
        "Blog"
      ]
    },
    {
      title: "Connect with Us",
      elements: [
        "Facebook",
        "Twitter",
        "Instagram",
        "LinkedIn"
      ]
    }
  ]

  const [isMenuActive, setIsMenuActive] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showUpButton, setShowUpButton] = useState("arrow-button-hidden")
  const [isTabletMenuActive, setIsTabletMenuActive] = useState(false)

  const [page, setPage] = useState("main")

  const width = window.innerWidth 

  function handleVisibleButton() {
    const position = window.pageYOffset
    setScrollPosition(position)
  
    if (scrollPosition > 800) {
      setShowUpButton("arrow-button")
    } else {
      setShowUpButton("arrow-button-hidden")
    }

    if (width < 1365) {
      if (scrollPosition > 1750) {
        setShowUpButton('arrow-button-less')
      }
    }
  
  }

  useEffect(() =>{
    window.addEventListener("scroll", handleVisibleButton)
  })

  const refScrollUp = useRef()

  function handleScrollUp() {
    refScrollUp.current.scrollIntoView({behavior: "smooth"})
  }



  return (
    <>

      <div className='container'>
        <div ref={refScrollUp}></div>
        <Header setIsMenuActive={setIsMenuActive} width={width} setIsTabletMenuActive={setIsTabletMenuActive} setPage={setPage} />
        {page === "main" &&
          <>
            <FirstBlock page={page} setPage={setPage} />
            <SecondBlock page={page} />
            <ThirdBlock />
          </> 
        }

        {page === 'quiz' && 
          <>
            <FirstBlock page={page} setPage={setPage} />
            <SecondBlock page={page} />
            <Quiz />
          </>
        }

        <Footer list={list} setPage={setPage} />
        <UpButton showUpButton={showUpButton} scrollUp={handleScrollUp}/>
      </div>
      
      {isMenuActive && <Menu setIsMenuActive={setIsMenuActive} />}
      {isTabletMenuActive && <MenuTablet setPage={setPage} list={list} setIsTabletMenuActive={setIsTabletMenuActive} />}
    </>

  )
}


function Header({setIsMenuActive, width, setIsTabletMenuActive, setPage}) {
  return (
    <>
      <header>
        
        <div className='logo-block' onClick={() => {
          if (width > 1365) {
            setIsMenuActive(true)
          } else {
            setPage('main')
          }
          }}>
          <img src={logo} className='logo-img' alt='logo'></img>
          <h1 className='logo-text'>Karlov</h1>
        </div>
        <nav>
          <h4 className='menu-pointer' onClick={() => setPage("main")}>Home</h4>
          <h4>About</h4>
          <h4 className='menu-pointer' onClick={() => setPage("quiz")}>Quiz</h4>
          <h4>Contact</h4>
          <a className='button'>FAQ</a>
        </nav>

        <img src={menu} alt="Menu" className='menu-button' onClick={() => setIsTabletMenuActive(true)}></img>
      </header>
    </>
  )
}

function FirstBlock({page, setPage}) {
  return (
    <>
      <div className='banner mb'>
        <h1 className='banner-title'>{page === 'main' ? "Welcome to Karlův Most Praha" : "Quiz about Karlův Most Praha"}</h1>
        {page === "main" &&
          <div className='banner-text-block'>
            <p className='banner-text'>Explore the rich history and stunning architecture of the iconic Karlův Most, a beloved landmark in the heart of Prague</p>
            <a className='button first-but' onClick={() => {setPage("quiz")}}>LEARN MORE</a>
          </div>
        }
      </div>
      {page === 'main' && <a className='button adapt-first-but mb' onClick={() => {setPage("quiz")}}>LEARN MORE</a>}

    </>
  )
}

function SecondBlock({page}) {
  return (
    <>
      <div className='second-block mb'>
        <div className='second-text-block banner-text-block'>
          <h2>{page === 'main' ? "Captivating Prague" : "Quiz"}</h2>
          {page === "main" && 
            <p className='gray-text second-text'>Discover the timeless charm of Karlův Most, 
              a beloved Prague landmark that has witnessed the city's evolution 
              over the centuries.<br/>
              Experience the Charm of Karlův Most, a beloved Prague landmark that 
              has stood the test of time, connecting the city's past and present 
              with its stunning architecture and rich history. Explore the bridge's 
              intricate details, marvel at the panoramic views, and immerse yourself 
              in the vibrant culture that thrives along its banks
            </p>
          }

          {page === "quiz" && 
            <p className='gray-text second-text'>Ready for a challenging and fun way to explore Karlův Most? Our quiz is 
              here to guide you through the history, architecture, and lore surrounding this famous Prague landmark. 
              Test your knowledge and see how much you really know about this bridge that 
              has connected people for centuries.<br/><br/>
              Take our Karlův Most quiz and enrich your understanding of this iconic structure. Each question is an 
              opportunity to learn more about the stunning views and cultural tales associated with the bridge. 
              Experience the bridge’s significance through engaging trivia that connects the dots between its past 
              and present.
            </p>
          }
        </div>
        <img src={most} alt='Karluv Most' className='second-img'></img>
      </div>
    </>
  )
}

function ThirdBlock() {
  return (
    <>
      <div className='third-block mb'>
        <div className='cards-col'>
          <Card color={"gray"} />
          <Card color={"white"} />
          <Card color={"gray"} />
        </div>
        <div className='cards-col'>
          <Card color={"white"} />
          <Card color={"gray"} />
          <Card color={"white"} />
        </div>
      </div>
    </>
  )
}

function Card({color}) {
  let cardClass = "card-gray"
  if (color === 'white') {
    cardClass = "card-white"
  }
  return (
    <>
      <div className={cardClass}>
        <img src={placeholder} alt='img' className='card-img'></img>
        <div className='card-text-block'>
          <h3 className='gray-text'>Unwind and Relax</h3>
          <p className='p16 gray-text'>Elevate Your Senses</p>
        </div>
      </div>
    </>
  )
}

function Footer({list, setPage}) {


  return (
    <>
      <footer>
        <div className='copyriate-block'>
          <img src={logo} alt='Logo' className='logo-img'></img>
          <div className='copyraite-text-block'>
            <p className='p16 gray-text'>© 2024 Karlov, Inc.</p>
            <p className='p16 gray-text'>All rights reserved.</p>
          </div>
        </div>

        <div className='lists-block'>
          <List list={list[0]} setPage={setPage} />
          <List list={list[1]} setPage={setPage} />
          <List list={list[2]} setPage={setPage} />
        </div>
      </footer>
    </>
  )
}

function List({list, setPage}) {
  let listItems = []
  for (let i = 0; i < list.elements.length; i++) {
    if (list.elements[i] === "Home") {
      listItems.push(<p className='p16 gray-text menu-pointer' key={i} onClick={() => {setPage("main")}}>{list.elements[i]}</p>)
    } else if (list.elements[i] === "Quiz") {
      listItems.push(<p className='p16 gray-text menu-pointer' key={i} onClick={() => {setPage('quiz')}}>{list.elements[i]}</p>)
    } else {
      listItems.push(<p className='p16 gray-text' key={i}>{list.elements[i]}</p>)
    }
  }

  return (
    <>
      <div className='list'>
        <p className='p16 bold gray-text'>{list.title}</p>
        {listItems}
      </div>

    </>
  )
}

function Menu({setIsMenuActive}) {
  return (
    <aside>
      <div className='logo-block' onClick={() => setIsMenuActive(false)}>
        <img src={logo} className='logo-img' alt='logo'></img>
        <h1 className='logo-text'>Karlov</h1>
      </div>
      <div className='menu-text-block'>
        <h4>Discover the Beauty</h4>
        <h4>Unwind and Relax</h4>
        <h4>Embrace Innovation</h4>
        <h4>Timeless Elegance</h4>
      </div>
    </aside>
  )

}

function UpButton({showUpButton, scrollUp}) {
  return (
    <>
      <div className={showUpButton} onClick={scrollUp}>
        <img src={arrow} alt='Arrow top' className='arrow'></img>
      </div>
    </>
  )

}

function MenuTablet({list, setIsTabletMenuActive, setPage}) {

  return (
    <div className='tablet-menu'>
      <div className='tablet-menu-nav'>
        <div className='logo-block' onClick={() => {setPage("main"); setIsTabletMenuActive(false)}}>
          <img src={logo} className='logo-img' alt='logo'></img>
          <h1 className='logo-text'>Karlov</h1>
        </div>
        <img src={cross} alt="Cross" className='' onClick={() => setIsTabletMenuActive(false)}></img>
      </div>

      <div className='tablet-menu-list'>
        <TabletList list={list[0]} setPage={setPage} setIsTabletMenuActive={setIsTabletMenuActive}/>
        <TabletList list={list[1]} setPage={setPage} setIsTabletMenuActive={setIsTabletMenuActive}/>
        <TabletList list={list[2]} setPage={setPage} setIsTabletMenuActive={setIsTabletMenuActive}/>
      </div>
    </div>
  )
}

function TabletList({list, setPage, setIsTabletMenuActive}) {
  let listItems = []
  for (let i = 0; i < list.elements.length; i++) {
    if (list.elements[i] === "Home") {
      listItems.push(<p className='gray-text menu-pointer' onClick={() => {setPage("main"); setIsTabletMenuActive(false)}}>{list.elements[i]}</p>)
    } else if (list.elements[i] === "Quiz") {
      listItems.push(<p className='gray-text menu-pointer' onClick={() => {setPage("quiz"); setIsTabletMenuActive(false)}}>{list.elements[i]}</p>)
    } else {
      listItems.push(<p className='gray-text'>{list.elements[i]}</p>)
    }
  }

  return (
    <>
      <div className='list'>
        <p className='bold gray-text'>{list.title}</p>
        {listItems}
      </div>

    </>
  )
}

function Quiz() {
  const [questionNumber, setQuestionNumber] = useState(1)
  const [rightAnswers, setRightAnswers] = useState(0)

  const quest = [
    {
      num: 1,
      title: "How long is the Karlův Most?",
      answers: [
        "140m",
        '315m',
        "450m",
        '520m'
      ],
      rightAnswer: "3"
    },
    {
      num: 2,
      title: "Until what year did the tram pass over the bridge?",
      answers: [
        "Until 1893",
        'Until 1905',
        "Until 1908",
        'Until 1911'
      ],
      rightAnswer: "2"
    },
    {
      num: 3,
      title: "How many sculptures and sculpture groups are there on the bridge?",
      answers: [
        "24",
        '30',
        "37",
        '40'
      ],
      rightAnswer: "1"
    },
    {
      num: 4,
      title: "When did the construction of the Karlův Most begin?",
      answers: [
        "In 1357",
        'In 1395',
        "In 1432",
        'In 1489'
      ],
      rightAnswer: "0"
    },
    {
      num: 5,
      title: "What material is the statue of Jan Nepomuksky made of?",
      answers: [
        "Made of stone",
        'Made of marble',
        "Made of bronze",
        'Made of gold'
      ],
      rightAnswer: "2"
    }
  ]


  if (questionNumber !== 6) {
    return (
      <>
        <div className='quiz'>
          {questionNumber === 1 ? 
          <QuizQuestion quest={quest[0]} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} setRightAnswers={setRightAnswers} /> :
          questionNumber === 2 ?  
          <QuizQuestion quest={quest[1]} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} setRightAnswers={setRightAnswers} /> :
          questionNumber === 3 ?  
          <QuizQuestion quest={quest[2]} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} setRightAnswers={setRightAnswers} /> :
          questionNumber === 4 ?  
          <QuizQuestion quest={quest[3]} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} setRightAnswers={setRightAnswers} /> :
          <QuizQuestion quest={quest[4]} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} setRightAnswers={setRightAnswers} /> 
          }
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='quiz'>
          <div className='quiz-question'>
            <h3>THE RESULTS OF THE QUIZ</h3>
            <div className='result-block'>
              <div className='quiz-text-block'>
                <h3 className='gray-text'>THE NUMBER OF CORRECT ANSWERS: <b>{rightAnswers} / 5</b></h3>
                <h3><b>{
                  rightAnswers === 5 ? 
                  "GREAT RESULT!" : 
                  rightAnswers <= 4 && rightAnswers >= 2 ?
                  "GOOD!" :
                  "IT COULD HAVE BEEN BETTER..."
                }</b></h3>
              </div>
              <img src={placeholder} alt='img' className='quiz-img'></img>
            </div>
            <div><a className='button' onClick={() => {
              setQuestionNumber(1)
              setRightAnswers(0)
            }}>REPEAT</a></div>
          </div>
        </div>
      </>
    )
  }

}

function QuizQuestion({setQuestionNumber, quest, questionNumber, setRightAnswers}) {
  const [radio, setRadio] = useState("")

  const answersList = quest.answers.map(answer => <div className='answer-item' key={quest.answers.indexOf(answer)}>
    <input type='radio' name='answers' id={quest.answers.indexOf(answer)} value={quest.answers.indexOf(answer)} className='answer-input' onChange={(e) => {
      handleRadioChanging(e)
    }}></input>
    <label htmlFor={quest.answers.indexOf(answer)} className='gray-text answer-text'>{answer}</label>
  </div>)

  function handleRadioChanging(e) {
    setRadio(e.target.value)
  }

  function handleAnswer(e) {
    e.preventDefault()
    const rightAnswer = quest.rightAnswer
    if (radio === rightAnswer) {
      setRightAnswers(n => n+1)
    }
    setQuestionNumber(n => n+1)
    document.getElementById(radio).checked = false;
    setRadio("")
  }

  let buttonClass = "button"
  if (radio === "") {
    buttonClass = "button disabled"
  }

  return (
    <>
      <form className='quiz-question'>
        <div className='quiz-text-block'>
          <p className='p16 gray-text'>{quest.num}/5</p>
          <h3 className='gray-text'>{quest.title}</h3>
          <div className='answers-block'>
            {answersList}
          </div>
        </div>
        <div className='button-block'>
          {buttonClass === "button" ?
            <a className={buttonClass} onClick={(e) => {handleAnswer(e)}}>{questionNumber === 5 ? "RESULT" : "NEXT"}</a> :
            <a className={buttonClass}>{questionNumber === 5 ? "RESULT" : "NEXT"}</a>
          }
        </div>
      </form>
    </>
  )
}