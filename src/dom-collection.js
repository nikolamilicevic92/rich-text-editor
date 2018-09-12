
export class DOMCollection
{
  constructor(nodes)
  {
    this.nodes = nodes;
  }

  prepend(nodes)
  {
    const firstChild = this.nodes[0].childNodes[0];
    nodes.forEach(node => {
      if(node instanceof DOMCollection) {
        this.nodes[0].insertBefore(node.nodes[0], firstChild);
      } else {
        this.nodes[0].insertBefore(node, firstChild);
      }
    })
    return this;
  }

  append(nodes)
  {
    nodes.forEach(node => {
      if(node instanceof DOMCollection) {
        this.nodes[0].appendChild(node.nodes[0]);
      } else {
        this.nodes[0].appendChild(node);
      }
    })
    return this;
  }

  appendTo(parent)
  {
    if(parent instanceof DOMCollection) {
      this.each(node => parent.nodes[0].appendChild(node));
    } else {
      this.each(node => parent.appendChild(node));
    }
    return this;
  }

  text(text = false)
  {
    if(text) {
      this.nodes.forEach(node => node.innerText = text.trim());
    } else {
      if(this.nodes.length == 1) {
        return this.nodes[0].innerText.trim();
      } else {
        const texts = [];
        this.nodes.forEach(node => texts.push(node.innerText.trim()));
        return texts;
      }
    }
    return this;
  }

  html(html = false)
  {
    if(html) {
      this.nodes.forEach(node => node.innerHTML = html);
    } else {
      if(this.nodes.length == 1) {
        return this.nodes[0].innerHTML;
      } else {
        const htmls = [];
        this.nodes.forEach(node => htmls.push(node.innerHTML));
        return htmls;
      }
    }
    return this;
  }

  value(value = false)
  {
    if(value) {
      this.nodes.forEach(node => node.value = value.trim());
    } else {
      if(this.nodes.length == 1) {
        return this.nodes[0].value.trim();
      } else {
        const values = [];
        this.nodes.forEach(node => values.push(node.value.trim()));
        return values;
      }
    }
    return this;
  }

  dom()
  {
    return this.nodes.length === 1 ? this.nodes[0] : this.nodes;
  }

  hide()
  {
    this.addClass('hidden');
    return this;
  }

  show()
  {
    this.removeClass('hidden');
    return this;
  }

  addClass(className)
  {
    this.nodes.forEach(node => node.classList.add(className));
    return this;
  }

  removeClass(className)
  {
    this.nodes.forEach(node => node.classList.remove(className));
    return this;
  }

  each(closure)
  {
    this.nodes.forEach((node, index) => closure(node, index));
    return this;
  }

  css(styles)
  {
    this.each(node => {
      for(let property in styles) {
        node.style[property] = styles[property];
      }
    });
    return this;
  }

  attr(name, value = false)
  {
    if(value) {
      this.each(node => node.setAttribute(name, value));
    } else {
      if(this.nodes.length == 1) {
        return this.nodes[0].getAttribute(name);
      } else {
        const attrs = [];
        this.each(node => attrs.push(node.getAttribute(name)));
        return attrs;
      }
    }
    return this;
  }

  on(event, closure, delay = 0)
  {
    this.each(node => { 
      let timeoutHandle;
      node.addEventListener(event, ev => {
        if(delay) {
          clearTimeout(timeoutHandle);
          timeoutHandle = setTimeout(() => closure(this, ev), delay);
        } else {
          closure(this, ev)
        }
      });
    });
    return this;
  }

}