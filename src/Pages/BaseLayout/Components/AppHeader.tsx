import { NavLink } from "react-router-dom";
import "./AppHeader.css"

interface IAppHeader
{
    onMenuClicked: () => void;
}

export function AppHeader(props: IAppHeader)
{
    const title:string = "Pop-Chord";

    const btn_sidebar = (
        <button 
            className="btn btn-action btn-primary"
            onClick={props.onMenuClicked}
        >
            <i className="icon icon-menu"/>
        </button>
    );

    const nav_btn_home = (
        <button className="btn btn-lg btn-link">
            <NavLink to="/" className="text-secondary">Home</NavLink>
        </button>
    );

    const nav_btn_chord_list = (
        <button className="btn btn-lg btn-link">
            <NavLink to="/all-chords" className="text-secondary">Chord Guide</NavLink>
        </button>
    );

    const title_large = (
        <>
            <div className="hide-md">
                <h2 
                    style={{margin:"0.2em"}}
                >
                    {btn_sidebar}   
                    <p className="d-inline-block" style={{margin:"0.2em", marginTop:"0"}}>
                        {title}
                    </p>
                </h2>
            </div>

            <div className="show-md">
                <h4 
                    style={{margin:"0.2em"}}
                >
                    {btn_sidebar}   
                    <p className="d-inline-block" style={{margin:"0.2em", marginTop:"0"}}>
                        {title}
                    </p>
                </h4>
            </div>
        </>
    )

    return (
        <div className="container bg-dark">

            <header className="navbar hide-xs app-header-x-padding">
                <section className="navbar-section">
                    {title_large}
                </section>
                <section className="navbar-section">
                    <div className="btn-group btn-group-block">
                        {nav_btn_home}
                        {nav_btn_chord_list}
                    </div>
                </section>
            </header>


            <header className="navbar show-xs">
                <section className="navbar-section">
                    <div className="btn-group btn-group-block my-1">
                        {btn_sidebar}
                        {nav_btn_home}  
                        {nav_btn_chord_list}
                    </div>
                </section>
            </header>
            
        </div>
    )   
}