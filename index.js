const selfAttr = ['id', 'class', 'src', 'href', 'type', 'rel', 'style', 'alt', 'title', 'target'];

console.log(DOMtoTree(document.body));

function DOMtoTree (root, config) {

    let data = mapDOM(root, true);
    let arr = JSON.parse(data);

    return arr;
}

function mapDOM (element, isJSON) {
    let treeObject = {};
    let docNode = null;
    let parser = null;

    if (typeof element === 'string') {
        if (window.DOMParser) {
            parser = new DOMParser();
            docNode = parser.parseFromString(element, 'text/html');
            console.log(docNode)
        }
        element = docNode.firstChild;
    }

    treeHTML(element, treeObject);

    return (isJSON) ? JSON.stringify(treeObject) : treeObject;
}

function treeHTML (element, object) {
    
    element['depth'] = (element.parentNode.depth !== undefined) ? (element.parentNode.depth + 1) : 0;
    object['depth'] = element.depth;
    object['nodeName'] = element.nodeName;
    object['tagName'] = element.tagName;
    object['children'] = [];
    object['attr'] = {};
    
    let children = object['children'];
    const nodeList = element.childNodes;
    const attr = element.attributes;
    
    if (nodeList != null && nodeList.length) {
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeType === 3) { // 文本节点
                if(nodeList[i].nodeValue.trim() !== '') {
                    children.push({'text': nodeList[i].nodeValue});
                }
            } else {
                children.push({});
                treeHTML(nodeList[i], children[children.length - 1]);
            }
        }
    }
    
    if (attr != null && attr.length) {
        
        for (let i = 0; i < attr.length; i++) {
            for(let j = 0; j < selfAttr.length; j++) {
                (attr[i].nodeName === selfAttr[j]) && (object[selfAttr[j]] = attr[i].nodeValue);
            }      
            (object[attr[i].nodeName] === undefined) && (object.attr[attr[i].nodeName] = attr[i].nodeValue);
        }
    }
}
