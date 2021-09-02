// Binary Search Tree

class Node{
    constructor(data,left=null,right=null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST{
    constructor(){
        this.root=null;
    };

    add(data){
        const node = this.root;
        if(node === null){
            // BST is empty
            // we are adding the first node so make this node as root node
            this.root = new Node(data);
            return;
        } else{
            // in case we are adding nodes to non-empty BST
            const searchTree = (node)=>{
                if(data<node.data){
                    // the new node is less than current node/root
                    if(node.left === null){
                        // their is no left node to the current node
                        node.left = new Node(data);
                        return;
                    }else if(node.left !== null){
                        // their is left node wrt to current node already
                        // call searchTree on the left child of the current node  to reach the terminals/leaf nodes
                        return searchTree(node.left);
                    }                   
                }else if(data>node.data){
                    //new node greater than current node
                    if(node.right === null){
                        // right child absent for current node
                        node.right = new Node(data);
                        return;
                    }else if(node.right !== null){
                        //right child already present for current node
                        // call searchTree on right child of current node
                        return searchTree(node.right);
                    }
                }else{
                    // if the new node to be added has value equal to the current root node we will not add this to BST
                    return null;
                }
            };
            // calling searchTree()
            return searchTree(node);
        }
    };

    findMin(){
        let current = this.root;
        while(current.left!==null){
            // as the smallest element would be at extreme left
            current=current.left;
        }
        return current.data;
    };

    findMax(){
        let current = this.root;
        while(current.right!==null){
            // as the largest element would be at extreme right
            current=current.right;
        }
        return current.data;
    };
    // binary search
    find(data){
        let current = this.root;
        while(current.data!==data){
            if(data<current.data){
                current=current.left;
            }else if(data>current.data){
                current=current.right;
            }
            // not present in BST
            if(current === null){
                return 'Not Found!!';
            }
        }
        return current;
    };

    isPresent(data){
        let current = this.root;
        while(current){
            if(data === current.data){
                return true;
            }
            if(data <current.data){
                current = current.left;
            }else {
                current=current.right;
            }
        }
        // if data is not present in BST
        return false;
    };

    
    remove(data){
        const removeNode = (node,data)=>{
            if(node===null){
                // BST is already empty
                return 'Cannot remove data from empty BST';
            }
            // node to be removed found
            if(data === node.data){
                // no children of removingNode
                if(node.left === null && node.right ===null){
                    // setting the reffernce to the node to null
                    // means its parent wont be reffering to it as left or right child
                    // deleting the node
                    return null;
                }
                // no left child
                if(node.left === null){
                    // replace the node reffernce to right child so that the parent to the node to be deleted now points to right child of deleted node
                    return node.right;
                }
                // no right child
                if(node.right === null){
                    // replace the node reffernce to left child so that the parent to the node to be deleted now points to left child of deleted node
                    return node.left;
                }
                //node has two children
                // refer the notes ds_algo_theory part
                let tempNode = node.right;// store the right child
                while(tempNode.left !== null){
                    // keep traversing left child
                    tempNode = tempNode.left;
                }
                // replace with the extreme left child of (right child(deleted node))
                node.data = tempNode.data;
                node.right = removeNode(node.right,tempNode.data);

            }
            else if(data<node.data){
                // recursion for left subtree
                node.left = removeNode(node.left,data);
                return node;
            }
            else{
                // recursion for right subtree
                node.right = removeNode(node.right,data);
                return node;
            }

        }
        // first invocation
        this.root = removeNode(this.root,data);

    }
}

// -----Quokka test 1 test case failing to reconsider-----
// const bst = new BST();
// bst.add(4);
// bst.add(2);
// bst.add(6);
// bst.add(1);
// bst.add(3);
// bst.add(5);
// bst.add(7);
// console.log(bst.root);
// console.log(bst.findMax());
// bst.remove(7);
// console.log(bst.isPresent(7));
// console.log(bst.findMin());
// console.log(bst.findMax());
// console.log(bst.root);
//                 4
//        2               6
//   1        3        5
// bst.remove(2);
// console.log(bst.root)
//                 4
//        2            5
//  1         3