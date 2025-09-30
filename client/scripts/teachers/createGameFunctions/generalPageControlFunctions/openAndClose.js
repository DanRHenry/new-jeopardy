export function openAndClose(element, closedHeight) {
    const target = document.getElementById(element)
    console.log(target, closedHeight)
    console.log("element: ",element.id)
    if (target.style.height === closedHeight) {
    //   console.log("here")
      target.style.height = null
    //   target.children.style.visibility = "visible"
    } else {
      console.log(target.style.height)
      target.style.height = closedHeight
    //   console.log(target.children)
    // target.children.style.visibility = "hidden"
    //   target.childNodes.style.display = "none"

    }
  }