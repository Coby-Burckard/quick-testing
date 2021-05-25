// variable selection
const inputForm = $("#input-form")
const runButton = inputForm.find("#start-button")
const addButton = inputForm.find("#add-button")

// on extension start
runLoad()

// event listeners
runButton.on("click", onClickRun)
addButton.on("click", onClickAdd)

// load
function runLoad() {
  console.log("extension has started")
}

/*
  CR-D
    todo:
      retreive
      delete
*/
function onClickAdd() {
  console.log("add clicked")
  const elementType = $("#add-select").val()
  console.log("submited a new element of type", elementType)
  if (elementType === "element") {
    setError("select an element")
  } else {
    createActionRow({ elementType })
  }
}

//run
function onClickRun() {
  const actionSet = buildActionSet()
  sendActions(actionSet)
}

/*
  Helpers
    todo: 
      validate (for storage or dom)
      store
      retreive
      setError (actually update extension)
*/
function buildActionSet() {
  const actionSet = []
  const actionPairs = inputForm.find(".action_pair")
  actionPairs.each((i, elem) => {
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

function setError(error) {
  console.log(error)
}

/*
  Extension DOM manipulation
    todo: 
      deleteActionRow
*/
function createActionRow({
  uuid,
  elementType,
  eventType = "",
  selector = "",
  value = "",
}) {
  const dataUuid = uuid ?? "1234"
  const hiddenNode = `<input type="hidden" data-uuid="${dataUuid}" />`
  const elementTypeNode = `<p data-uuid="${dataUuid}">${elementType}</p>`

  //event type dropdown
  const eventOptionNodes = generateEventOptionNodes(elementType)
  const eventTypeSelect = `<select data-uuid="${dataUuid}" value=${eventType}>${eventOptionNodes}</select>`

  const selectorNode = `<input type="text" data-uuid="${dataUuid}" value="${selector}" placeholder="selector"/>`
  const valueNode = `<input type="text" data-uuid="${dataUuid}" value="${value}" placeholder="value"/>`

  $(".input-grid").append(
    [
      hiddenNode,
      elementTypeNode,
      eventTypeSelect,
      selectorNode,
      valueNode,
    ].join("")
  )
}

function generateEventOptionNodes(elementType, eventType) {
  let options = []

  switch (elementType) {
    case "button":
      options = ["click"]
      break
    case "text":
      options = ["type"]
      break
  }

  return options.map((option) => `<option>${option}</option>`).join("")
}
