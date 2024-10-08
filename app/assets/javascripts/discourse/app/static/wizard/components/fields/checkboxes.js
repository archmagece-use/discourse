import Component from "@ember/component";
import { action, set } from "@ember/object";

export default class Checkboxes extends Component {
  init(...args) {
    super.init(...args);
    this.set("field.value", this.field.value || []);

    for (let choice of this.field.choices) {
      if (this.field.value.includes(choice.id)) {
        set(choice, "checked", true);
      }
    }
  }

  @action
  changed(checkbox) {
    let newFieldValue = this.field.value;
    const checkboxValue = checkbox.parentElement
      .getAttribute("value")
      .toLowerCase();

    if (checkbox.checked) {
      newFieldValue.push(checkboxValue);
    } else {
      const index = newFieldValue.indexOf(checkboxValue);
      if (index > -1) {
        newFieldValue.splice(index, 1);
      }
    }
    this.set("field.value", newFieldValue);
  }
}
