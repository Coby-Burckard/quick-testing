// variable selection
const inputForm = $("#id_input_form")
const runButton = inputForm.find("#id_start_button")
const display = $("#id_display")

// event listeners
runButton.on("click", onClickRun)

/*
  interacting with extension and chrome
*/
function onClickRun() {
  const actionSet = buildActionSet()
  sendActions(actionSet)
}

function buildActionSet() {
  const actionSet = []
  const actionPairs = inputForm.find(".action_pair")
  actionPairs.each((ind, elem) => {
    const pair = $(elem)
    const event = pair.find(".action_event").val()
    const selector = pair.find(".action_selector").val()
    actionSet.push({
      event,
      selector,
    })
  })
  return actionSet
}

async function sendActions(actionSet) {
  console.log("sending message to tab")
  const queryOptions = { active: true, currentWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)
  chrome.tabs.sendMessage(tab.id, actionSet)
}
