// variable selection

// input
const inputForm = $("#id_input_form")
const runButton = inputForm.find("#id_start_button")

//event listeners
runButton.on("click", runInTab(colorBackground))

// interacting with extension and chrome

// interacting with tab/DOM (no jquery allowed)
function colorBackground() {
  console.log("clicked button")
  const logoContainer = document.querySelector(".k1zIA.rSk4se")
  logoContainer.style.backgroundColor = "red"
}

// helpers
function runInTab(injectedFunction) {
  return async () => {
    const queryOptions = { active: true, currentWindow: true }
    const [tab] = await chrome.tabs.query(queryOptions)
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: injectedFunction,
    })
  }
}
