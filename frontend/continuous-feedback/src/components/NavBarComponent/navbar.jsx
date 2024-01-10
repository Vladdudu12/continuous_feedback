import Button from "../button/button";
import TextField from "../text_field/text-field"

export default function NavBar(props) {
    return (
        <div>
    <TextField>{props.text}</TextField>
    <Button>{props.text}</Button>
    <Button>{props.text}</Button>
    </div>);
  }