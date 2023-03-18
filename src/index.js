"use strict";
exports.__esModule = true;
exports.network = void 0;
var prompt = require('prompt-sync')();
// Node Class, a piece of the graph structure
var Node = /** @class */ (function () {
    function Node(value) {
        this.connections = [];
        this.value = value;
    }
    // Connect to a new node
    Node.prototype.connect = function (node) {
        this.connections.push(node);
    };
    // Disconnect from a node
    Node.prototype.disconnect = function (node) {
        var elementIndex = this.connections.indexOf(node);
        if (elementIndex != -1)
            this.connections.splice(elementIndex, 1);
    };
    // Get connected nodes
    Node.prototype.getConnectedNodes = function () {
        return this.connections;
    };
    // Get node value
    Node.prototype.getValue = function () {
        return this.value;
    };
    return Node;
}());
;
// Graph Class, a piece of the graph structure
var Graph = /** @class */ (function () {
    function Graph() {
        this.nodes = [];
    }
    // Add a node into the graph and return its index
    Graph.prototype.addNode = function (value) {
        var newNode = new Node(value);
        this.nodes.push(newNode);
        return newNode;
    };
    // Get a node from the graph by index
    Graph.prototype.getNode = function (index) {
        return this.nodes[index];
    };
    // Get a nodes index by value
    Graph.prototype.getNodeIndex = function (value) {
        var returnIndex = -1;
        this.nodes.some(function (node, index) {
            if (value == node.getValue()) {
                returnIndex = index;
                return true;
            }
            ;
            return false;
        });
        return returnIndex;
    };
    // Connect two nodes
    Graph.prototype.connect = function (node1, node2) {
        node1.connect(node2);
        node2.connect(node1);
    };
    // Disconnect two nodes
    Graph.prototype.disconnect = function (node1, node2) {
        node1.disconnect(node2);
        node2.disconnect(node1);
    };
    // Delete a node
    Graph.prototype.deleteNode = function (node) {
        var connectedNodes = node.getConnectedNodes();
        for (var _i = 0, connectedNodes_1 = connectedNodes; _i < connectedNodes_1.length; _i++) {
            var connectedNode = connectedNodes_1[_i];
            this.disconnect(connectedNode, node);
        }
        var elementIndex = this.nodes.indexOf(node);
        if (elementIndex != -1)
            this.nodes.splice(elementIndex, 1);
    };
    // Print all nodes and their connections
    Graph.prototype.print = function () {
        if (this.nodes.length == 0) {
            console.log("The network is currently empty.");
            return;
        }
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            var nodes = node.getConnectedNodes();
            if (nodes.length == 0) {
                console.log(node.getValue() + " has no friends...");
            }
            else if (nodes.length == 1) {
                console.log(node.getValue() + " has " + nodes.length + " friend: " + nodes.map(function (node) { return node.getValue(); }));
            }
            else {
                console.log(node.getValue() + " has " + nodes.length + " friends: " + nodes.map(function (node) { return node.getValue(); }));
            }
        }
    };
    return Graph;
}());
var buildNetwork = function (graph, users) {
    while (true) {
        console.log("Which action would you like to take?");
        console.log("1: Add new user");
        console.log("2: Connect two users");
        console.log("3: Delete a user");
        console.log("4: Disconnect two users");
        console.log("5: List users and their connections");
        console.log("6: Quit");
        var action = parseInt(prompt("> "));
        console.log();
        var user = void 0, userA = void 0, userB = void 0;
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
};
function network() {
    var friendBook = new Graph();
    var users = {};
    buildNetwork(friendBook, users);
}
exports.network = network;
network();
