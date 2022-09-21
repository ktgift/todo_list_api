module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                minimum(value) {
                    if (value.length < 4) {
                        throw new Error('length must be greater than 3')
                    }
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
    {
        underscored: true,
        // timestamp: false
    });

    User.associate = models => {
        User.hasMany(models.Todo, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        })
    }

    return User;
};

