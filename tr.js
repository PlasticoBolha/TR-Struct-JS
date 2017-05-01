<script>
	class Leaf {
		constructor() {
			this.children = {};
	    	this.children.leaf = [];
	    }

	    set(x,y) {
	    	var ID = x+","+y;
	    	this.children.leaf.ID = ID;
	    }

	    getLeaf() {
	    	return this.children.leaf;
	    }

	    addChildren(x,y,goTo) {
	    	var ID = x+","+y;
	    	this.children.leaf[goTo] = {};
	    	this.children.leaf[goTo].ID = ID;
	    }
	}

	class Tree {
		set(leaf,newLeaf) {
			for (var member in leaf)
				delete leaf[member];
			for (var member in newLeaf)
				Object.defineProperty(leaf, member, {value: newLeaf[member]});
		}

		addLeaf(refRoot,leaf,path) {
			var result;
			if ((typeof refRoot === "undefined")) {
				return false;
			}else{
				// Right
				if ((typeof refRoot.right === "undefined") && (!refRoot))
						return ;
				result = this.addLeaf(refRoot.right,leaf,path);
				if (result) {
					path.push(refRoot.ID);
					return true;
				}
				if (refRoot && (refRoot.ID == leaf.ID)) {
					path.push(refRoot.ID);
					this.set(refRoot,leaf);
					return true;
				}
				// left
				if ((typeof refRoot.left === "undefined") && (!refRoot))
						return ;
				result = this.addLeaf(refRoot.left,leaf,path);
				if (result) {
					path.push(refRoot.ID);
					return true;
				}
				if (refRoot && (refRoot.ID == leaf.ID)) {
					path.push(refRoot.ID);
					this.set(refRoot,leaf);
					return true;
				}
			}
		}

		add(leaf) {
			if (this.root) {
				var path = [];
				this.addLeaf(this.root,leaf,path);
				console.log(path.reverse());
			}else{
				this.ID;
				this.root = leaf;
			}
		}
	}

	var leaf = new Leaf();
	var tree = new Tree();

	leaf.set(0,0);
	leaf.addChildren(0,1,"right");
	leaf.addChildren(1,1,"left");

	tree.add(leaf.getLeaf());
	console.log("-----");

	leaf = new Leaf();
	leaf.set(1,1);
	leaf.addChildren(2,2,"left");

	tree.add(leaf.getLeaf());
	console.log("-----");

	leaf = new Leaf();
	leaf.set(2,2);
	leaf.addChildren(3,3,"left");
	
	tree.add(leaf.getLeaf());
	console.log("-----");
	leaf = new Leaf();
	leaf.set(0,1);
	leaf.addChildren(2,3,"left");

	tree.add(leaf.getLeaf());
</script>
