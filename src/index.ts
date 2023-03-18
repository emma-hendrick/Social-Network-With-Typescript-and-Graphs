const prompt = require('prompt-sync')();

// Node Class, a piece of the graph structure
class Node {
  private value: string;
  private connections: Node[] = [];
  
  constructor (value: string) {
    this.value = value;
  }

  // Connect to a new node
  connect (node: Node) {
    this.connections.push(node);
  }

  // Disconnect from a node
  disconnect (node: Node) {
    const elementIndex = this.connections.indexOf(node);
    if (elementIndex != -1) this.connections.splice(elementIndex, 1);
  }

  // Get connected nodes
  getConnectedNodes (): Node[] {
    return this.connections;
  }

  // Get node value
  getValue (): string {
    return this.value;
  }
};

// Graph Class, a piece of the graph structure
class Graph {
  private nodes: Node[] = [];

  // Add a node into the graph and return its index
  addNode (value: string): Node {
    const newNode: Node = new Node(value);
    this.nodes.push(newNode);
    return newNode;
  }

  // Get a node from the graph by index
  getNode (index: number): Node {
    return this.nodes[index];
  }

  // Get a nodes index by value
  getNodeIndex (value: string): number {
    var returnIndex = -1;
    
    this.nodes.some((node, index) => {
      if (value == node.getValue()) {
        returnIndex = index;
        return true;
      };
      return false;
    })

    return returnIndex;
  }

  // Connect two nodes
  connect (node1: Node, node2: Node) {
    node1.connect(node2);
    node2.connect(node1);
  }

  // Disconnect two nodes
  disconnect (node1: Node, node2: Node) {
    node1.disconnect(node2);
    node2.disconnect(node1);
  }

  // Delete a node
  deleteNode (node: Node) {
    const connectedNodes: Node[] = node.getConnectedNodes();
    for (const connectedNode of connectedNodes) {
      this.disconnect(connectedNode, node);
    }
    
    const elementIndex = this.nodes.indexOf(node);
    if (elementIndex != -1) this.nodes.splice(elementIndex, 1);
  }

  // Print all nodes and their connections
  print () {
    if (this.nodes.length == 0) {
      console.log("The network is currently empty.");
      return;
    }
    for (const node of this.nodes) {
      const nodes = node.getConnectedNodes();

      if (nodes.length == 0) {
        console.log(node.getValue() + " has no friends...");
      }
      else if (nodes.length == 1) {
        console.log(node.getValue() + " has " + nodes.length + " friend: " + nodes.map((node: Node) => node.getValue()));
      }
      else {
        console.log(node.getValue() + " has " + nodes.length + " friends: " + nodes.map((node: Node) => node.getValue()));
      }
    }
  }
}

const buildNetwork = (graph: Graph, users: {[name: string]: Node}) => {

  while (true) {

    console.log("Which action would you like to take?");
    console.log("1: Add new user");
    console.log("2: Connect two users");
    console.log("3: Delete a user");
    console.log("4: Disconnect two users");
    console.log("5: List users and their connections");
    console.log("6: Quit");

    const action = parseInt(prompt("> "));
    console.log();
    let user, userA, userB;

    switch (action) {
      case 1:
        console.log("Enter user name: ");
        user = prompt("> ");
        users[user] = graph.addNode(user);
        break;
      case 2:
        console.log("Enter first user name: ");
        userA = users[prompt("> ")];
        console.log("Enter second user name: ");
        userB = users[prompt("> ")];
        graph.connect(userA, userB);
        break;
      case 3:
        console.log("Enter user name: ");
        graph.deleteNode(users[prompt("> ")]);
        break;
      case 4:
        console.log("Enter first user name: ");
        userA = users[prompt("> ")];
        console.log("Enter second user name: ");
        userB = users[prompt("> ")];
        graph.disconnect(userA, userB);
        break;
      case 5:
        graph.print();
        break;
      case 6:
        return;
    }

    console.log();

  }
}

export function network() {

  var friendBook = new Graph();
  const users: {[name: string]: Node} = {};

  buildNetwork(friendBook, users);

}

network();