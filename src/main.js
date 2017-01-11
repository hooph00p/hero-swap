/**
 * React Entry Point
 * More Info: https://github.com/hooph00p/hero-swap#readme
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Bulma from '../node_modules/bulma/css/bulma.css'
import Style from './style.sass'
import 'whatwg-fetch'

// This reducer handles all the hero store actions (adding a new hero, merging two heroes)
const heroReducer = function(state = [], action) {

    // Add a hero
    if (action.type === 'ADD_HERO') {
        return [
            ...state,
            action.hero
        ]
    }

    // Successfully get hero list from server
    if (action.type === 'HERO_LIST_SUCCESS'){
        return action.heroes;
    }

    if (action.type === 'MERGE_HEROES'){
        // TODO
    }

    return state;
}

// This reducer handles UI state (adding a hero, merging multiple heroes)
const actionReducer = function(state = { action: 'NONE' }, action){
    
    // These just change the state to merge/add
    if (action.type === 'ADD_HERO' || action.type === 'MERGE_HEROES'){
        return {
            action: action.type
        };
    }

    // These change the state back to normal.
    if( action.type === 'SUCCESS' || action.type === 'FAILURE' ){
        return { action: 'NONE' };
    }
    return state;
}

// Hero Class has a "merging" property that toggles whether or not it's being merged with other heroes
// TODO: Write a "select" to gather all merging heroes and consolidate attributes in merge form.
const Hero = React.createClass({
    getInitialState:function(){
        return {
            merging: false
        };
    },
    // Changes the button and state
    toggleMerge: function(){
        this.setState({
            merging: !this.state.merging
        });
    },
    render: function(){
        return (
            <div className="box">
                <div className="columns" >
                    
                    {/* HERO NAME */}
                    <div className="column">
                        <input className="input" type="text" value={this.props.hero.hero_name}/>
                    </div>
                    
                    {/* REAL NAME */}
                    <div className="column">
                        <input className="input" type="text" value={this.props.hero.real_name} />
                    </div>

                    {/* GENDER */}
                    <div className="column">
                        <p className="control">
                            <span className="select">
                                <select value={this.props.hero.gender}>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </span>
                        </p>
                    </div>

                </div>
                <div className="columns">

                    {/* POWERS */}
                    <div className="column is-two-thirds is-offset-one-third">
                        <h1> Powers </h1><button className="button is-outlined is-small">Add Power</button>
                        <p>                             
                            {this.props.hero.powers.map(
                                (power) => { return (
                                    <span key={power} className="tag is-info ">
                                        {power}
                                        <button className="delete is-small"></button>
                                    </span>
                                        )}
                                )
                            }
                        </p>
                    </div>

                </div>   
                <div className="columns">

                    {/* WEAKNESSES */}
                    <div className="column is-two-thirds is-offset-one-third">
                        <h1> Weaknesses </h1> <button className="button is-outlined is-small">Add Weakness</button>
                        <p>                            
                            {this.props.hero.weaknesses.map(
                                (weakness)=>{ 
                                    return (
                                        <span key={weakness} className="tag is-warning">
                                        {weakness}<button className="delete is-small"></button>
                                        </span>
                                        )}
                                )
                            }
                        </p>   
                    </div>

                </div>
                <div className="columns">

                    
                    <div className="column has-text-right">
                        {/* MERGE BUTTON (hidden if add form) */}
                        <button className={"button is-success is-focused " 
                            + (this.state.merging ? "" : " is-outlined ") 
                            + (!!this.props.controlHero ? "is-hidden" : "") } 
                            onClick={this.toggleMerge} 
                            value={this.state.merging}>
                            Merge
                        </button>
                        {/* SUBMIT BUTTON (hidden if regular hero) */}
                        <button className={"button is-success is-focused " + (!this.props.controlHero ? "is-hidden" : "")}>Submit</button>
                    </div>
                </div>
            </div>   
        )
    }
})

// This is a list of all the heroes (can select for merge)
const Heroes = React.createClass({ 
    render: function(){
        return (
            <div className="row"> {
                 heroStore.getState().map((hero) =>{
                    return (
                            <Hero key={hero.id} hero={hero} />             
                        )
                })
            }
            </div>
        )
    }
});

// This controls the action state of the app.
const HeroControls = React.createClass({
    // Swap state
    addHero: function(){
        actionStore.dispatch({
            type: 'ADD_HERO'
        });
    },
    // Swap state
    mergeHeroes: function(){
        actionStore.dispatch({
            type: 'MERGE_HEROES'
        });
    },
    render: function(){
        return (
            <nav className="nav">
                <div className="nav-right nav-menu">
                    <span className="nav-item">
                        <a className="button" onClick={this.addHero}>
                        <span>Add New Hero</span>
                        </a>
                        <a className="button" onClick={this.mergeHeroes}>
                        <span>Merge Selected Heros</span>
                        </a>
                    </span>
                </div>
            </nav>
        )
    }
});

// Empty hero model for ADD HERO
const EMPTY_HERO = {
        hero_name: '',
        real_name: '',
        weaknesses: [],
        powers: [],
        gender: ''
    };

// Add Hero form
const AddHero = React.createClass({
    render: function(){
        return (
        <div className={ actionStore.getState().action === 'ADD_HERO' ? "" : "is-hidden" }>
                <Hero hero={ EMPTY_HERO } controlHero={true} />
            </div>
        )  
    }
});

// Merge Hero form
const MergeHero = React.createClass({
    render: function(){
        return (
            <div className={ actionStore.getState().action === 'MERGE_HEROES' ? "" : "is-hidden" } >
                Merge Form!
            </div>
        )
    }
})

// Fetches heroes from the server (cached via node)
// And sets various states of the application.
const App = React.createClass( {
    componentDidMount:function(){
        fetch('/heroes')
            .then((response) => { return response.json() })
            .then((json) => {
                heroStore.dispatch({ type: 'HERO_LIST_SUCCESS', heroes: json});
            }); 
    },
    render:function() {
        return (
            <div className="container">
                <HeroControls/>
                <hr/>
                <AddHero/>
                <MergeHero/>
                <br/>
                <Heroes/>
            </div>
        )
    }
} )

// This stores all the heroes we add/merge/gather
const heroStore = createStore(heroReducer)
// This stores the action state of the app
const actionStore = createStore(actionReducer)

// Monitor the render fn
const render = () => ReactDOM.render(
    <App />,
    document.getElementById('app')
)
render()

// Subscribe to react's render
heroStore.subscribe(render)
actionStore.subscribe(render)