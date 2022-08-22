import { Button } from "@mui/material";

import './pages-button.components.scss'

const PageButton = (props) => {  
    const {pageNumber, blogsLength}  = props;
    const pageButtons = [];

    const nextPage = () => {
        if(pageNumber < blogsLength){
            const page = pageNumber + 1;
            props.setPageNumber(page);
        }
    }

    const previousPage = () => {
        if(pageNumber !== 1){
            const page = pageNumber - 1;
            props.setPageNumber(page);
        }
    }

    for(let i = 1; i <= blogsLength; i++) {
        pageButtons.push(
            <Button 
                variant = 'contained' 
                value = {i}
                key = {i} 
                onClick = {() => {
                    props.setPageNumber(i);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }}
                className = 'page-button'
                disabled = {i === pageNumber ? true : null}
            >{i}</Button>
        )
    }
    return(
        <div className="pages-button-container">
            <Button variant = 'text' onClick = {previousPage}>&#10094;</Button>
            {pageButtons}
            <Button variant = 'text' onClick = {nextPage}>&#10095;</Button>
        </div>
    )
}

export default PageButton;