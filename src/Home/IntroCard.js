import React from 'react'

export default function IntroCard() {
  return (
      <div className='flex flex-wrap justify-center'>
        <article className="mw6 ma2 bg-white br3 pa3 pa4-ns mv3 ba b--black-10 intro-card">
            <div className="tc">
                <h1 className="f3">Getting started with Voice Assistant...</h1>
                <hr className="mw3 bb bw1 b--black-10"/>
            </div>
            <p className="lh-copy measure center f5 color-lb">
                Click on Voice Assist button to activate the voice assistant
            </p>
        </article>

        <article className="mw6 ma2 bg-white br3 pa3 pa4-ns mv3 ba b--black-10 intro-card">
            <div className="tc">
                <h1 className="f3">To know about the app</h1>
                <hr className="mw3 bb bw1 b--black-10"/>
            </div>
            <p className="lh-copy measure center f5 color-lb">
                Try asking <strong className='color-lb'>"What does this app do?"</strong>
            </p>
        </article>

        <article className="mw6 ma2 bg-white br3 pa3 pa4-ns mv3 ba b--black-10 intro-card">
            <div className="tc">
                <h1 className="f3">To navigate through the app</h1>
                <hr className="mw3 bb bw1 b--black-10"/>
            </div>
            <p className="lh-copy measure center f5 color-lb">
                Say <strong className='color-lb'>"Go to Home/Search Stocks/My Stocks/Profile/"</strong>
            </p>
        </article>

        <article className="mw6 ma2 bg-white br3 pa3 pa4-ns mv3 ba b--black-10 intro-card">
            <div className="tc">
                <h1 className="f3">To search for stocks</h1>
                <hr className="mw3 bb bw1 b--black-10"/>
            </div>
            <p className="lh-copy measure center f5 color-lb">
                Try saying <strong className='color-lb'>"Search for (Stock Name)"</strong>. <br></br>
                <strong className='color-lb'>Stock Names:</strong> Reliance, TATA, Mahindra etc.
            </p>
        </article>

        <article className="mw6 ma2 bg-white br3 pa3 pa4-ns mv3 ba b--black-10 intro-card">
            <div className="tc">
                <h1 className="f3">To logout of the app</h1>
                <hr className="mw3 bb bw1 b--black-10"/>
            </div>
            <p className="lh-copy measure center f5 color-lb">
                Say <strong className='color-lb'>"Log out or Log out from my account"</strong>
            </p>
        </article>
      </div>
  )
}