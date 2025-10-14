/**
 * Challenge: See if you can figure out how to use the
 * react-markdown package to render `props.recipe` as React
 * elements rather than the plain markdown text.
 * 
 * Use the link in the slide to navigate directly to the
 * package's instructions on how to use it.
 * 
 * Use the `suggested-recipe-container` class on the <section>
 * below to get some free styling 🙂
 */
import ReactMarkdown from 'react-markdown'

export default function ClaudeRecipe(props) {
    return (
        <section className="suggested-recipe-container">
            <ReactMarkdown>
                {props.recipe}
            </ReactMarkdown>
        </section>
    )
}