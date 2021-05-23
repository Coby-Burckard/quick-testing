/*
  interacting with tab/DOM (no jquery allowed)
*/

console.log("script was loaded")

chrome.runtime.onMessage.addListener((request) => {
  console.log("received message with ", request)
  manipulateTab(request)
})

function manipulateTab(actionSet) {
  console.log("action set implementation", actionSet)
  actionSet.forEach((action) => executeAction(action))
}

function executeAction({ event, selector }) {
  console.log("executing action", event, "on", selector)
  const element = document.querySelector(`${selector}`)
  switch (event) {
    case "click":
      element.click()
      break
    default:
      console.log("unsupported event", event)
  }
}
