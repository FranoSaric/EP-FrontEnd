/**
 * Checks if forwarded item have children or not
 * @param {object} item object with some variable where a child object may be involved
 * @returns
 */

 const HasChildren = (item) => {
    const { items: children } = item;

    if (children === undefined) {
        return false;
    }

    if (children.constructor !== Array) {
        return false;
    }

    if (children.length === 0) {
        return false;
    }

    return true;
};

export default HasChildren;
